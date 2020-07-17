import { db, FieldValue, auth } from '../../../database/firestore.js';
import { validate, isString, isLevel, isId } from '../../../utils/validate.js';

const validateNewGroup = validate({
    description: isString,
    level: isLevel,
    name: isString,
    creator: isId // TEMP?
});

export default async (req, res) => {
    if (req.method === 'POST') {
        try {
            validateNewGroup(req.body);
        } catch (err) {
            return res.status(400).send(err.message);
        }
        const creator = req.body.creator; // TEMP
        const { name, description, level } = req.body;
        const group = {
            admins: [creator],
            description,
            image: 'https://cdn.discordapp.com/attachments/710932856809193497/733549780382384148/download_2.jpeg', // TEMP
            level,
            members: [creator],
            name,
            schedule: []
        }

        const groupRef = await db.collection('groups').add(group);
        // Add groupId to user data
        await db.collection('users').doc(creator).update({
            // https://firebase.google.com/docs/firestore/manage-data/add-data#update_elements_in_an_array
            groups: FieldValue.arrayUnion(groupRef.id)
        });
        res.status(200).json({ groupId: groupRef.id });
    }
}
