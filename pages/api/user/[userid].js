import db from '../../../database/firebase-config.js';

export default async (req, res) => {
    const userId = req.query.userid;

    if (req.method === 'GET') {
        const userData = db.collection('users').doc(userId);
        const doc = await userData.get();
        if (!doc.exists) {
            console.log(`${userId} does not exist`);
            res.status(404).send(`User ID ${userId} not found.`);
        } else {
            res.status(200).json(doc.data());
        }
    }
    else if (req.method === 'POST') {
        let data = []
        req.on('data', chunk => {
            data.push(chunk);
        });
        req.on('end', () => {
            data = Buffer.concat(data).toString();
            data = JSON.parse(data)

            const userRef = db.collection('users').doc(userId);
            // https://stackoverflow.com/a/39333479
            await workoutRef.set((({ workouts, recent_workouts, completed_workouts, groups,
                name, profile_picture, background_picture, calories, time_spent })
                => ({
                    workouts, recent_workouts, completed_workouts, groups,
                    name, profile_picture, background_picture, calories, time_spent
                }))(data))

            res.status(201);
            res.end();
        });
    }
}