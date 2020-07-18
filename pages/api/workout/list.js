import { db } from '../../../database/firestore.js';
import { validateWorkout } from './new.js';

export default async (req, res) => {
    const workoutIds = req.body;

    const workoutData = []
    if (req.method === 'POST') {
        for (let workoutId of workoutIds) {
            const workoutDatum = db.collection('workouts').doc(workoutId);
            const doc = await workoutDatum.get();
            if (!doc.exists) {
                console.log(`${workoutId} does not exist`);
            } else {
                workoutData.push({
                    workoutId: workoutId,
                    workoutDatum: doc.data()
                });
            }
        }
    }
    return res.json(workoutData);
}