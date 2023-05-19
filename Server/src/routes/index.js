const {login} = require('../controllers/login')
const {getCharById} = require('../controllers/getCharById')
const {postFav, deleteFav} = require('../controllers/handleFavorites')
const postUser = require('../controllers/postUser')

const router = require('express').Router()

router.get('/character/:id', getCharById)

router.get('/login',login)

router.post('/login', async (req,res) => {
    try {
        const { email, password } = req.body
        const newUser = await postUser({email,password})
        res.status(200).json(newUser)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.post('/fav',postFav)

router.delete('/fav/:id', deleteFav)

module.exports = router