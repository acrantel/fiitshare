import { db, FieldValue, auth } from '../../../../database/firestore.js';
import { validate, isId } from '../../../../utils/validate.js';

const validateJoinRequest = validate({
    joiner: isId // TEMP?
});

export default async (req, res) => {
    const groupId = req.query.groupid;
    if (req.method === 'POST') {
        try {
            validateJoinRequest(req.body);
        } catch (err) {
            return res.status(400).send(err.message);
        }
        const { joiner } = req.body;

        const groupData = db.collection('groups').doc(groupId);
        if (!(await groupData.get()).exists) {
            return res.status(400).send(`Group ID ${groupId} not found.`);
        }
        const userData = db.collection('users').doc(joiner);
        if (!(await userData.get()).exists) {
            return res.status(400).send(`User ${joiner} not found.`);
        }
        await groupData.update({
            members: FieldValue.arrayUnion(joiner)
        });
        // Add groupId to user data
        await userData.update({
            groups: FieldValue.arrayUnion(groupId)
        });
        res.status(201).end();
    }
}
