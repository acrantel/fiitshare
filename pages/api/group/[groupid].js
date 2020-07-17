import {db} from '../../../database/firestore.js';

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

        const groupRef = db.collection('groups').doc(groupId);

        // https://stackoverflow.com/a/39333479
        await groupRef.set((({ name, image, level, description, members, admins, schedule }) => ({ name, image, level, description, members, admins, schedule }))(data))

        res.status(201);
        res.end();
    }
}