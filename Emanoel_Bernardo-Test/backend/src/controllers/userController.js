const User = require('../models/User')
const bcrypt = require('bcrypt-nodejs')

const encryptPassword = password => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

module.exports ={
    async create(req, res){
        const { email, password } = req.body
        if( !email || !password){
            return res.status(400).send()
        }

        const passwordEncrypt = encryptPassword(password)

        await User.create({
            email,
            password: passwordEncrypt
        }).then((user) => {
            return res.json({ userId: user._id})
        }).catch(e => {
            console.log(e)
            return res.status(500).send()
        })


    },

    async index(req, res){
        const { email, password } = req.body
        if( !email || !password){
            return res.status(400).send()
        }

        const user = await User.findOne({
            email
        })

        if(!user) return res.status(400).send()
        else{
            const matchPasswords = bcrypt.compareSync(password.toString(), user.password)
    
            if(!matchPasswords) return res.status(401).send()
            else {
                return res.json({ userId: user._id})
            }
        }

    }
}