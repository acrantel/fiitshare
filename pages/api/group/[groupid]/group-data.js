import { db, getDoc } from '../../../../database/firestore.js';
// returns the schedule of the group, the workout data of the group's scheduled workouts, the user data of the users in the group
export default async (req, res) => {
    const groupId = req.query.groupid;
    if (req.method === 'GET') {
        let groupDatum = await db.collection('groups').doc(groupId).get();
        if (!groupDatum) { return res.status(404).send(`Group ID ${groupId} not found.`); }
        groupDatum = groupDatum.data();

        const scheduledWorkouts = [];

        const schedulesRef = await db.collection('groups').doc(groupId).collection('schedule').get();
        for (const schedule of schedulesRef.docs) {
            let { dueBy, workoutId } = schedule.data();

            const workout = await getDoc('workouts', workoutId);
            if (!workout) continue;
            const { name,  } = workout;

            scheduledWorkouts.push({
                workoutId: workoutId,
                dueBy: dueBy.toMillis(),
                completed: Math.random() < 0.5, // TODO
                workoutDatum: workout
            });
        }

        const users = []

        for (const member of groupDatum['members']) {
            const {name, profile_picture } = await getDoc('users', member);
            const isAdmin = (groupDatum['admins'].indexOf(member) > -1);
            users.push({
                name: name,
                profile_picture: profile_picture,
                uid: member,
                admin: isAdmin
            });
        }

        res.status(200).json({
            groupDatum: groupDatum,
            scheduledWorkouts: scheduledWorkouts,
            users: users
        });
    }
}
