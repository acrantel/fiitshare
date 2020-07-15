import db from '../../../database/firebase-config.js';

export default (req, res) => {
    console.log(req.body);
    const userId = req.query.userid;
    console.log('request from, ', userId);
    
    if (req.method === 'GET') {
        const userData = db.collection('users').doc(userId);
        // const doc = await userData.get();
        // if (!doc.exists) {
        //     console.log(`${userId} does not exist`);
        //     res.status(404).send(`User ID ${userId} not found.`);
        // } else {
        //     res.status(200).json(doc.data());
        // }
        // res.end();
    }
    else if (req.method === 'POST') {
        // console.log('in post');
        // let result = await streamToString(req);
        // console.log('got result: ', result);
        // let jsoned = JSON.parse(result);

        // const userRef = db.collection('users').doc(userId);
        // // https://stackoverflow.com/a/39333479
        // let cleaned = (({ workouts, recent_workouts, completed_workouts, groups,
        //     name, profile_picture, cover_picture, calories, time_spent, this_week }) => ({
        //         workouts, recent_workouts, completed_workouts, groups,
        //         name, profile_picture, cover_picture, calories, time_spent, this_week
        //     }))(jsoned);

        // await userRef.set(cleaned);

        // res.status(201);
        // res.end();

    }
}

function streamToString(stream) {
    const chunks = []
    return new Promise((resolve, reject) => {
        stream.on('data', chunk => chunks.push(chunk))
        stream.on('error', () => { console.log('error in stream') })
        stream.on('end', () => {
            console.log('end of stream');
            return resolve(Buffer.concat(chunks).toString('utf8'))
        })
    })
}