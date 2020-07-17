import {db} from '../../../database/firestore.js';
import { validateWorkout } from './new.js';

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
        try {
            validateWorkout(data);
        } catch (err) {
            return res.status(400).send(err.message);
        }

        const workoutRef = db.collection('workouts').doc(workoutId);

        await workoutRef.set(data);

        res.status(201);
        res.end();
    }
}