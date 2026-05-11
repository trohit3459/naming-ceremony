import { useState, useEffect, useCallback } from "react";
import {
  doc,
  onSnapshot,
  runTransaction,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const VOTE_STORAGE_KEY = "naming_ceremony_voted";
const VOTE_DOC_ID = "poll_results";
const COLLECTION_NAME = "votes";

/**
 * Custom hook for managing poll votes with Firebase Firestore.
 * Handles real-time updates, vote submission, and duplicate prevention.
 */
export function useVotes() {
  const [votes, setVotes] = useState({ boy: {}, girl: {} });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [error, setError] = useState(null);

  // Check if user already voted (localStorage)
  useEffect(() => {
    const voted = localStorage.getItem(VOTE_STORAGE_KEY);
    if (voted) {
      setHasVoted(true);
    }
  }, []);

  // Real-time listener for vote counts
  useEffect(() => {
    // Safety fallback: if Firebase doesn't respond in 3 seconds, show the UI anyway
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    const docRef = doc(db, COLLECTION_NAME, VOTE_DOC_ID);

    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        clearTimeout(timer);
        if (snapshot.exists()) {
          const data = snapshot.data();
          setVotes({
            boy: data.boy || {},
            girl: data.girl || {},
          });
        }
        setLoading(false);
      },
      (err) => {
        clearTimeout(timer);
        console.error("Error listening to votes:", err);
        // We don't set an error here anymore because we want the UI to show up 
        // as a fallback even if voting is temporarily unavailable
        setLoading(false);
      }
    );

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  // Submit vote using Firestore transaction for atomicity
  const submitVote = useCallback(
    async (boyNameId, girlNameId) => {
      if (hasVoted) {
        setError("You have already voted!");
        return false;
      }

      setSubmitting(true);
      setError(null);

      try {
        const docRef = doc(db, COLLECTION_NAME, VOTE_DOC_ID);

        await runTransaction(db, async (transaction) => {
          const docSnap = await transaction.get(docRef);

          if (!docSnap.exists()) {
            // Initialize the document if it doesn't exist
            const initialData = {
              boy: { [boyNameId]: 1 },
              girl: { [girlNameId]: 1 },
            };
            transaction.set(docRef, initialData);
          } else {
            const data = docSnap.data();
            const boyVotes = data.boy || {};
            const girlVotes = data.girl || {};

            boyVotes[boyNameId] = (boyVotes[boyNameId] || 0) + 1;
            girlVotes[girlNameId] = (girlVotes[girlNameId] || 0) + 1;

            transaction.update(docRef, {
              boy: boyVotes,
              girl: girlVotes,
            });
          }
        });

        localStorage.setItem(VOTE_STORAGE_KEY, "true");
        setHasVoted(true);
        setSubmitting(false);
        return true;
      } catch (err) {
        console.error("Error submitting vote:", err);
        setError("Failed to submit vote. Please try again.");
        setSubmitting(false);
        return false;
      }
    },
    [hasVoted]
  );

  return {
    votes,
    loading,
    submitting,
    hasVoted,
    error,
    submitVote,
  };
}
