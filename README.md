# 👶 Twin Naming Ceremony Invitation

A beautiful, interactive naming ceremony invitation website with live polling for baby names.

## ✨ Features

- 🎨 Premium glassmorphism UI with baby-themed colors
- 🗳️ Live voting poll for baby boy & girl names
- 🔥 Real-time vote counts via Firebase Firestore
- ⏱️ Live countdown timer to the ceremony
- 📱 Fully responsive mobile-first design
- 🎉 Confetti celebration on vote submission
- 🗺️ Google Maps link for venue navigation
- 🔒 Duplicate vote prevention (localStorage)

## 🛠️ Tech Stack

- **Frontend:** React + Vite
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Backend:** Firebase Firestore
- **Hosting:** Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Firebase project

### 1. Clone the repository

```bash
git clone https://github.com/trohit3459/naming-ceremony.git
cd naming-ceremony
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Firebase

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project (or use existing)
3. Enable **Firestore Database** (start in test mode)
4. Register a **Web App** under Project Settings
5. Copy the config values

### 4. Configure environment variables

```bash
cp .env.example .env
```

Fill in your Firebase credentials in `.env`.

### 5. Set Firestore Security Rules

In Firebase Console → Firestore → Rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /votes/{document=**} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```

> ⚠️ For production, add rate limiting and validation rules.

### 6. Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 📦 Build for Production

```bash
npm run build
```

## 🌐 Deploy to Vercel

1. Push to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

## 📁 Project Structure

```
src/
├── components/
│   ├── CountdownTimer.jsx    # Live countdown to ceremony
│   ├── EventDetails.jsx      # Date, time, venue card
│   ├── FloatingParticles.jsx  # Background decorations
│   ├── Footer.jsx             # Closing message
│   ├── HeroSection.jsx        # Main invitation header
│   ├── LoadingSpinner.jsx     # Loading state
│   ├── NameCard.jsx           # Individual name vote card
│   └── PollSection.jsx        # Vote polling section
├── hooks/
│   └── useVotes.js            # Firebase voting hook
├── App.jsx                    # Main app component
├── constants.js               # Names & event data
├── firebase.js                # Firebase initialization
├── index.css                  # Design system & styles
└── main.jsx                   # React entry point
```

## 📋 Event Details

- **Event:** Twin Naming Ceremony
- **Date:** 13th May 2026
- **Time:** 7:00 PM Onwards
- **Venue:** Shelar Marriage Lawn, Kalyan

---

Made with ❤️ for our little angels
