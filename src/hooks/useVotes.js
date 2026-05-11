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
 * Upgraded with robust error handling and submission locking.
 */
export function useVotes() {
  const [votes, setVotes] = useState({ boy: {}, girl: {} });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const voted = localStorage.getItem(VOTE_STORAGE_KEY);
    if (voted) setHasVoted(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
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
        console.error("Firebase Sync Error:", err);
        setLoading(false);
      }
    );

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  const submitVote = useCallback(
    async (boyNameId, girlNameId) => {
      if (hasVoted || submitting) return false;

      setSubmitting(true);
      setError(null);

      try {
        const docRef = doc(db, COLLECTION_NAME, VOTE_DOC_ID);

        await runTransaction(db, async (transaction) => {
          const docSnap = await transaction.get(docRef);
          const currentData = docSnap.exists() ? docSnap.data() : { boy: {}, girl: {} };
          
          const newBoyVotes = { ...currentData.boy };
          const newGirlVotes = { ...currentData.girl };
          
          newBoyVotes[boyNameId] = (newBoyVotes[boyNameId] || 0) + 1;
          newGirlVotes[girlNameId] = (newGirlVotes[girlNameId] || 0) + 1;

          transaction.set(docRef, {
            boy: newBoyVotes,
            girl: newGirlVotes,
          }, { merge: true });
        });

        localStorage.setItem(VOTE_STORAGE_KEY, "true");
        setHasVoted(true);
        return true;
      } catch (err) {
        console.error("Submission Error:", err);
        setError("Network error. Please check your connection.");
        return false;
      } finally {
        setSubmitting(false);
      }
    },
    [hasVoted, submitting]
  );

  return { votes, loading, submitting, hasVoted, error, submitVote };
}
