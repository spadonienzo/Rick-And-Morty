const { Favorite } = require('../DB_connection')

const postFav = async (req, res) => {
    const {name,origin,status,image,species,gender} = req.body
    try {
        if(!name || !origin || !status || !species || !gender) return res.status(401).send('Faltan datos')
        await Favorite.findOrCreate({where: {name,origin,status,image,species,gender}})
        const favorite = await Favorite.findAll()
        return res.status(200).json(favorite)
    }catch (error) {
        return res.status(500).json({message:error.message})
    }
}
const deleteFav = async (req, res) => {
    const {id} = req.params
    try {
        await Favorite.destroy({where: {id:id}})
        const favs = Favorite.findAll()
        return res.status(200).json(favs)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

module.exports = {
    postFav,
    deleteFav
}