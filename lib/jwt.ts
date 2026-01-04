import { cookie, cookiewithid } from "@/types/cookie";
import "jsonwebtoken";
import { verify, sign, SignOptions } from "jsonwebtoken";
const secretkey = process.env.SESSION_secret
export async function encrypt(id: string | number, expiresIn: string = '1h'): Promise<string> {
    if (secretkey == undefined)
        return '';
    return sign(
        { id },
        secretkey,
        {
            algorithm: 'HS256',
            expiresIn: expiresIn as SignOptions['expiresIn']
        }
    );
}

export async function decrypt(session: string): Promise<cookie> {
    try {
        const data = verify(session, String(secretkey))
        if (typeof data === 'object' && data !== null && 'id' in data) {
            return data as cookiewithid
        }
        return String(data)
    }
    catch (err) {
        return (err as Error).message.toString()
    }
}