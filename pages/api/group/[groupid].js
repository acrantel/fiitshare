import {db} from '../../../database/firestore.js';
import { validate, isId, arrayOf, isString, isUrl, isLevel } from '../../../utils/validate.js';

const validateGroup = validate({
    admins: arrayOf(isId),
    description: isString,
    image: isUrl,
    level: isLevel,
    members: arrayOf(isId),
    name: isString,
    schedule: arrayOf(isId)
});

export default async (req, res) => {
    const groupId = req.query.groupid;

    if (req.method === 'GET') {
        const groupData = db.collection('groups').doc(groupId);
        const doc = await groupData.get();
        if (!doc.exists) {
            console.log(`${groupId} does not exist`);
            res.status(404).send(`Group ID ${groupId} not found.`);
        } else {
            res.status(200).json(doc.data());
        }
    }
    else if (req.method === 'POST') {
        let data = req.body;
        try {
            validateGroup(data);
        } catch (err) {
            return res.status(400).send(err.message);
        }

        const groupRef = db.collection('groups').doc(groupId);

        await groupRef.set(data);

        res.status(201);
        res.end();
    }
}