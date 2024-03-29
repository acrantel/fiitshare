import {db} from '../../../database/firestore.js';
import { validate, isNumber, isInt, isUrl, isId, arrayOf, isString } from '../../../utils/validate.js';

export const userSpec = {
    calories: isNumber,
    completed_workouts: isInt,
    cover_picture: isUrl,
    groups: arrayOf(isId),
    name: isString,
    profile_picture: isUrl,
    recent_workouts: arrayOf(isId),
    this_week: validate({
        activity: arrayOf(isNumber),
        calories: arrayOf(isNumber)
    }),
    time_spent: isNumber,
    workouts: arrayOf(isId)
};
const validateUser = validate(userSpec);
const validateUpdateUser = validate(userSpec, { partial: true });

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
        res.end();
    } else if (req.method === 'PUT') {
        try {
            validateUpdateUser(req.body);
        } catch (err) {
            return res.status(400).send(err.message);
        }
        
        const userRef = db.collection('users').doc(userId);
        if (!(await userRef.get()).exists) {
            return res.status(404).send(`User ID ${userId} not found.`);
        }
        await userRef.update(req.body);
        res.status(201).end();
    } else if (req.method === 'POST') {
        let data = req.body;
        try {
            validateUser(data);
        } catch (err) {
            return res.status(400).send(err.message);
        }

        const userRef = db.collection('users').doc(userId);

        await userRef.set(data);

        res.status(201);
        res.end();
    }
}
