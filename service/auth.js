import jwt from 'jsonwebtoken'

const secret = process.env.SECRET;

export async function createToken(user){
    const payload={
        id:user._id,
        name: user.name,
        email : user.email
    }
    return jwt.sign(payload, secret);
}

export async function verifyToekn(token){
    return jwt.verify(token, secret);
}