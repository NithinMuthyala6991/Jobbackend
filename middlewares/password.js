
import bcrypt from 'bcryptjs'


export const _hashPassword =  (password) => {

    return new Promise((resolve , reject) => {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                resolve(hash)
            });
        });
    })
}


export const _comparePassword = (password , hashed) => {
        return bcrypt.compare(password , hashed)
} 

