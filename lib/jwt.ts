import * as jwt from 'jsonwebtoken'
const secretkey = process.env.SESSION_secret
export async function encrypt(id: string | number, expiresIn: string = '1h'): Promise<string> {
    if (secretkey == undefined)
        return '';
    return jwt.sign(
        { 'id': id },
        secretkey,
        {
            algorithm: 'HS256',
            expiresIn: expiresIn
        }
    )
}

export async function decrypt(session: string): Promise<jwt.JwtPayload | string> {
    try {
        const data = jwt.verify(session, String(secretkey))
        return data;
    }
    catch (err) {
        return err.message.toString()
    }
}