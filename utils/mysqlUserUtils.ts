import bcrypt from 'bcrypt'
import { db, query } from "@/lib/mysqldb";
export async function addUsertoDB(email: string, password: string): Promise<string> {
    try {
        const hashedPassword: string = await bcrypt.hash(password, parseInt(process.env.HASHING_SALT))

        await (await db).execute(query.addUser, [email, await hashedPassword])

        return 'OK'
    } catch (err) {
        return 'User Already Exists'
    }
}


export async function deleteUserfromDB(email: string): Promise<string> {
    const userdetails = await (await db).query(query.getUserDetails, [email])
    if (await userdetails[0].length < 1)
        return email + ' does not exist'
    console.log('[DB]:Deleting User ' + email)
    await (await db).execute(query.deleteUser, [email])
    return 'OK'
}


export async function updateUserPassword(email: string, currentpassword: string, newpassword: string): Promise<string> {
    try {
        const userdetails = await (await db).execute(query.getUserDetails, [email])
        if (userdetails[0].length < 1) {
            return 'USER_NOT_FOUND'
        }
        const hashedPassword = userdetails[0][0].password
        const isMatch = await bcrypt.compare(
            currentpassword,
            hashedPassword
        )
        if (!isMatch) {
            return 'WRONG_PASSWORD'
        }
        const newHashedPassword = await bcrypt.hash(
            newpassword,
            Number(process.env.HASHING_SALT)
        )
        await (await db).execute(query.updateUserPassword, [newHashedPassword, email])
        return 'OK'
    } catch (err) {
        console.error('[UPDATE PASSWORD ERROR]', err)
        return 'ERROR'
    }
}
