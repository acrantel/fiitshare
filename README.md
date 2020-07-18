# Fiitshare

A fitness website for the community, by the community.

Share your workouts!

Devpost: https://devpost.com/software/fiitshare

Youtube: https://youtu.be/gXVfnnBSmhI

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

## Screenshots

![Screenshot of personal dashboard](https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/001/156/484/datas/gallery.jpg)

![Screenshot of members tab in group page](https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/001/156/486/datas/gallery.jpg)

![Screenshot of profile page](https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/001/156/488/datas/gallery.jpg)

![Workout creator](https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/001/156/493/datas/gallery.jpg)

![Workout page](https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/001/156/513/datas/gallery.jpg)

![Sign in page](https://cdn.discordapp.com/attachments/732852292776362019/734167514644480020/signin_2.jpg)

