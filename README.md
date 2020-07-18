# Fiitshare

A fitness website for the community, by the community.

Share your workouts!

Devpost: https://devpost.com/software/fiitshare

## What you can do

Join a workout group to access personalized workout schedules.

Create custom workouts with a convenient user interface, share your custom workout's URL with friends.

Follow along to custom workouts with an automatically generated, step by step video.

Track your progress on your profile page.

## Built with

We built our web app with Next.js (React + Node.js). We used Firestore as our database and FirebaseUI Auth for user authentication.

## Running the app

```sh
git clone https://github.com/acrantel/fiitshare.git
cd fiitshare
yarn install
```

Create a Firebase project and add a web app to it ([Instructions](https://firebase.google.com/docs/web/setup)).

Create a `firebaseConfig.json` file in fiitshare's root directory and add your firebase keys (you can find these in Project settings > General > Your apps > Firebase SDK snippet):

```json
{
  "apiKey": "your api key",
  "authDomain": "your auth domain",
  "databaseURL": "your database url",
  "projectId": "your project ID",
  "storageBucket": "your storage bucket",
  "messagingSenderId": "your messaging sender ID",
  "appId": "your app ID"
}
```

Run `yarn run` in the root directory and follow the instructions for building/running the app.

