import db from '../../../../database/firestore.js';

// returns the schedule of the group, the workout data of the group's scheduled workouts, the user data of the users in the group
export default async (req, res) => {
    const groupId = req.query.groupid;

    if (req.method === 'GET') {
        const groupDatum = await db.collection('groups').doc(groupId).get();
        if (!groupDatum.exists) {
            console.log(`${groupId} does not exist`);
            res.status(404).send(`Group ID ${groupId} not found.`);
            return;
        }
        const groupSchedule = await db.collection("groups").doc(groupId).collection('schedule').get();

        let workoutData = [(await db.collection('workouts').doc('OVD81KYOxjCHSxvDnVLO').get()).data()];
        
        groupSchedule.forEach(async doc => {
            let scheduleData = doc.data();
            workoutData.push(doc.data());
        });

        for (let s = 0; s < workoutData.length; s++) {
            workoutData[s] = [workoutData[s],(await db.collection('workouts').doc(workoutData[s]['workoutId']).get()).data()]
        }
        res.status(200).json({
            groupDatum: groupDatum.data(),
            workoutData: workoutData
        });
    }
}