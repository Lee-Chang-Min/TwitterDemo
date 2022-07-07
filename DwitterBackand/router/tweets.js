import express from 'express';
import 'express-async-errors';
import  nodemon  from 'nodemon';

let tweets = [
    {
        id: '1',
        text: '드림코딩화이팅',
        createAt: Date.now().toString(),
        name: 'Bob',
        username: 'bob',
        url: 'https://cdn.expcloud.co/life/uploads/2020/04/27135731/Fee-gentry-hed-shot-1.jpg'
    },

    {
        id: '2',
        text: '안녕 난 창민',
        createAt: Date.now().toString(),
        name: 'Lcm',
        username: 'lcm',
        url: 'https://cdn.expcloud.co/life/uploads/2020/04/27135731/Fee-gentry-hed-shot-1.jpg'
    }
]

const router = express.Router();

//Get /tweets
//Get /tweets?username=:username
router.get('/', (req, res, next) => {
    const username = req.query.username;
    const data = username 
    ? tweets.filter(t => t.username === username)
    : tweets;
    
    res.status(200).json(data);

});

//GET /tweets/:id
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const tweet = tweets.find(t => t.id === id);

    if(tweet){
        res.status(204).json(tweet);
    } else {
        res.status(404).json({massage : `Tweet ${id} not found` });
    }
})


//POST /tweets
router.post('/', (req, res, next) => {
    const {text, name, username } = req.body;
    const tweet = {
        id : Date.now().toString(),
        text,
        createdAt: new Date(),
        name,
        username
    };

    tweets = [tweet, ...tweets];
    res.status(201).json(tweet);
});

//PUT /tweets/:id
router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const text = req.body.text;
    const tweet = tweets.find((t) => t.id === id);
    if (tweet){
        tweet.text = text;
        res.status(200).json(tweet);
    } else {
        res.status(404).json({massage : `Tweet ${id} not found`})
    }
})

//DELETE /tweets/:id
router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    tweets = tweets.filter((t) => t.id !== id);
    res.sendStatus(204);
});


export default router;