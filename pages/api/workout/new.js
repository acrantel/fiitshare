import { db, FieldValue } from '../../../database/firestore.js';
import { validate, isNumber, isId, arrayOf, isIntensity, isString, isInt } from '../../../utils/validate.js';

export const validateWorkout = validate({
    // This should be determined from the authentication, I think
    calories: isNumber,
    creator: isId,
    exercises: validate({
        exerciseId: arrayOf(isId),
        time: arrayOf(isNumber)
    }),
    intensity: isIntensity,
    length: isNumber,
    name: isString,
    sets: isInt
});

export default async (req, res) => {
    if (req.method === 'POST') {
        try {
            validateWorkout(req.body);
        } catch (err) {
            return res.status(400).send(err.message);
        }

        const workoutRef = await db.collection('workouts').add(req.body);
        // Add workoutId to user data
        const { creator } = req.body;
        await db.collection('users').doc(creator).update({
            // https://firebase.google.com/docs/firestore/manage-data/add-data#update_elements_in_an_array
            workouts: FieldValue.arrayUnion(workoutRef.id)
        });
        res.status(200).json({ workoutId: workoutRef.id });
    }
}
