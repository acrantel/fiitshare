import {db} from '../../../database/firestore.js';

export default async (req, res) => {

    // get list of exercises
    if (req.method === 'GET') {
        let resultList = [];
        const exerciseList = await db.collection('exercises').get();
        exerciseList.forEach(doc => {
            resultList.push({
                id: doc.id,
                exerciseDatum: doc.data()
            });
        });
        console.log(resultList);
            res.status(200).json(resultList);
    }
}