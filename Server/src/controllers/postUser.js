const { User } = require('../DB_connection')

// const postUser = async (req,res) => {
//     const { email, password } = req.body
//     try {
//         if(!email || !password) return res.status(400).send('Faltan datos')
//         const user = await User.findOrCreate({
//             where: {email: email ,password: password}})
//         return res.status(200).json(user)         
//     } catch (error) {
//         return res.status(500).json(error.message)
//     }
// }

const postUser = async ( {email, password}) => {  
    if(!email || !password) throw Error('Faltan datos')
    const user = await User.create({email,password})
    return user
}
module.exports = postUser
