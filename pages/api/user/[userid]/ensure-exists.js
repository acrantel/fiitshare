import {db} from '../../../../database/firestore.js';
import { validate, isUrl, isString } from '../../../../utils/validate.js';

const validateNewUser = validate({
    cover_picture: isUrl,
    name: isString,
    profile_picture: isUrl,
});

export default async (req, res) => {
    const userId = req.query.userid;
    
    if (req.method === 'POST') {
        try {
            validateNewUser(req.body);
        } catch (err) {
            return res.status(400).send(err.message);
        }
        
        const userData = db.collection('users').doc(userId);
        const doc = await userData.get();
        
        if (!doc.exists)  {
            const { cover_picture, name, profile_picture } = req.body;
            const newUser = {
                calories: 0,
                completed_workouts: 0,
                cover_picture,
                groups: [],
                name,
                profile_picture,
                recent_workouts: [],
                this_week: {
                    activity: [],
                    calories: []
                },
                time_spent: 0,
                workouts: []
            }
            await userData.set(newUser);
        }

        res.status(201).end();
    }
}