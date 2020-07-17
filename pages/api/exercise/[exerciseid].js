import {db} from '../../../database/firestore.js';

export default async (req, res) => {
    const exerciseId = req.query.exerciseid;

    if (req.method === 'GET') {
        const exerciseData = db.collection('exercises').doc(exerciseId);
        const doc = await exerciseData.get();
        if (!doc.exists) {
            console.log(`${exerciseId} does not exist`);
            res.status(404).send(`Exercise ID ${exerciseId} not found.`);
        } else {
            res.status(200).json(doc.data());
        }
    }
}