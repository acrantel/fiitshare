import db, { getDoc } from '../../../../database/firestore.js';

export default async (req, res) => {
    const userId = req.query.userid;
    if (req.method === 'GET') {
        const user = await getDoc('users', userId);
        if (!user) return res.status(404).send(`User ID ${userId} not found.`);
        
        const { workouts, name } = user;
        const workoutData = [];
        for (const workoutId of workouts) {
            const workout = await getDoc('workouts', workoutId);
            if (!workout) continue;
            const {
                name,
                creator,
                intensity,
                calories,
                length
            } = workout;
            workoutData.push({
                id: workoutId,
                name,
                creator,
                intensity,
                calories,
                length
            });
        }
        res.status(200).json({
            workouts: workoutData,
            name
        });
    }
}
