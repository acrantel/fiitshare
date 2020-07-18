import { db } from '../../../database/firestore.js';

export default async (req, res) => {
    const userId = req.query.userid;
    if (req.method === 'GET') {
        const allExercisesRef = await db.collection('exercises').get();
        res.status(200).json(
            Object.fromEntries(
                allExercisesRef.docs.map(exercise => [
                    exercise.id,
                    exercise.data()
                ])
            )
        );
    }
}
