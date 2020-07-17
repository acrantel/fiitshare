import { db, getDoc } from '../../../../database/firestore.js';

export default async (req, res) => {
    const userId = req.query.userid;
    if (req.method === 'GET') {
        const user = await getDoc('users', userId);
        if (!user) return res.status(404).send(`User ID ${userId} not found.`);
        const { groups } = user;
        
        const yours = [];
        const searchable = [];
        const allGroupsRef = await db.collection('groups').get();
        for (const group of allGroupsRef.docs) {
            const { name, description, image, level, members = [] } = group.data();
            const card = {
                id: group.id,
                name,
                description,
                image,
                level,
                memberCount: members.length
            };
            if (groups.includes(group.id)) {
                yours.push(card);
            } else {
                searchable.push(card);
            }
        }
        res.status(200).json({ yours, searchable });
    }
}
