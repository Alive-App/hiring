
const bcrypt = require('bcrypt-nodejs')
const encryptPassword = password => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}


describe('Password tests', () => {
    it('Password hash', async () => {
        const password = '1234567'
        const passwordEncrypt = encryptPassword(password)

        const matchPasswords = bcrypt.compareSync(password, passwordEncrypt)

        expect(matchPasswords).toBe(true)
    
    })

 })