import db from '../../database/firestore.js';

export default (req, res) => {
    console.log(req.body);
    console.log(JSON.parse(req.body));
    const userId = req.query.userid;
    console.log('request from, ', userId);

    if (req.method === 'POST') {
        console.log('in post');
        console.log(req.body);

        res.status(201);
        res.end();

    }
}