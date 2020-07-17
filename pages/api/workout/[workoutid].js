import {db} from '../../../database/firestore.js';

export default async (req, res) => {
    const workoutId = req.query.workoutid;

    if (req.method === 'GET') {
        const workoutData = db.collection('workouts').doc(workoutId);
        const doc = await workoutData.get();
        if (!doc.exists) {
            console.log(`${workoutId} does not exist`);
            res.status(404).send(`Workout ID ${workoutId} not found.`);
        } else {
            res.status(200).json(doc.data());
        }
        res.end();
    }
    else if (req.method === 'POST') {
        let data = req.body;

        const workoutRef = db.collection('workouts').doc(workoutId);

        // https://stackoverflow.com/a/39333479
        await workoutRef.set((({ creator, name, intensity, length, calories, sets, exercises }) => ({ creator, name, intensity, length, calories, sets, exercises }))(data))

        res.status(201);
        res.end();
    }
}