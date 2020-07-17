import { db, getDoc } from '../../../../database/firestore.js';

export default async (req, res) => {
    const userId = req.query.userid;
    if (req.method === 'GET') {
        const user = await getDoc('users', userId);
        if (!user) return res.status(404).send(`User ID ${userId} not found.`);
        
        const { groups = [] } = user;
        const workouts = [];
        for (const groupId of groups) {
            const groupData = db.collection('groups').doc(groupId);
            const doc = await groupData.get();
            if (!doc.exists) continue;
            const { image } = doc.data();
            
            const schedulesRef = await groupData.collection('schedule').get();
            for (const schedule of schedulesRef.docs) {
                const { dueBy, workoutId } = schedule.data();
                
                const workout = await getDoc('workouts', workoutId);
                if (!workout) continue;
                const { name } = workout;
                
                workouts.push({
                    workoutId,
                    workoutName: name,
                    groupImage: image,
                    dueBy: dueBy.toMillis(),
                    completed: Math.random() < 0.5 // TODO
                });
            }
        }
        
        res.status(200).json(workouts);
    }
}
