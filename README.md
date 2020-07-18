# fiitshare

A fitness website for the community, by the community.

Share your workouts!


## What you can do

Join a workout group to access personalized workout schedules.

Create custom workouts with a convenient user interface, share your custom workout's URL with friends.

Follow along to custom workouts with an automatically generated, step by step video.

Track your progress on your profile page.

## Built with

We built our web app with Next.js (React + Node.js). We used Firestore as our database and FirebaseUI Auth for user authentication.

## Running the app

```
git clone https://github.com/acrantel/fiitshare.git
yarn install
```

Create a Firebase project and add a web app to it ([Instructions](https://firebase.google.com/docs/web/setup))

Create a `.env.local` file in fiitshare's root directory and add your firebase keys:

```
FIREBASE_API_KEY=your api key
FIREBASE_AUTH_DOMAIN=your auth domain
FIREBASE_DATABASE_URL=your database url
FIREBASE_PROJECT_ID=your project Id
FIREBASE_STORAGE_BUCKET=your storage bucket
FIREBASE_MESSAGING_SENDER_ID=your messaging sender id
```

Run `yarn run` in the root directory and follow the instructions for building/running the app.

