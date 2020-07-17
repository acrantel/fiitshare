import { db, FieldValue } from '../../../database/firestore.js';

export default async (req, res) => {
    if (req.method === 'POST') {
        let {
            // This should be determined from the authentication, I think
            creator,
            name,
            intensity,
            length,
            calories,
            sets,
            exercises
        } = req.body;

        const workoutRef = await db.collection('workouts').add({
            creator,
            name,
            intensity,
            length,
            calories,
            sets,
            exercises
        });
        // Add workoutId to user data
        await db.collection('users').doc(creator).update({
            // https://firebase.google.com/docs/firestore/manage-data/add-data#update_elements_in_an_array
            workouts: FieldValue.arrayUnion(workoutRef.id)
        });
        res.status(200).json({ workoutId: workoutRef.id });
    }
}
