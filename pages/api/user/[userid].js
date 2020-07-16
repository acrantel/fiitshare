import db from '../../../database/firebase-config.js';

export default async (req, res) => {
    console.log(req.body);
    const userId = req.query.userid;
    console.log('request from, ', userId);
    
    if (req.method === 'GET') {
        const userData = db.collection('users').doc(userId);
        const doc = await userData.get();
        if (!doc.exists) {
            console.log(`${userId} does not exist`);
            res.status(404).send(`User ID ${userId} not found.`);
        } else {
            res.status(200).json(doc.data());
        }
        res.end();
    }
    else if (req.method === 'POST') {
        let data = req.body;

        const userRef = db.collection('users').doc(userId);

        // https://stackoverflow.com/a/39333479
        await userRef.set((({ workouts, recent_workouts, completed_workouts, groups,
            name, profile_picture, cover_picture, calories, time_spent, this_week }) => ({ workouts, recent_workouts, completed_workouts, groups,
                name, profile_picture, cover_picture, calories, time_spent, this_week }))(data))

        res.status(201);
        res.end();
    }
}
