import bcrypt from 'bcrypt'
import { db, query } from "@/lib/mysqldb";
import { userdetailsresponse } from '@/types/response'
import type { RowDataPacket, ResultSetHeader } from 'mysql2'

type UserRow = RowDataPacket & {
    id: number
    email: string
    password: string
}

export async function addUsertoDB(email: string, password: string): Promise<string> {
    try {
        const hashedPassword: string = await bcrypt.hash(password, Number(process.env.HASHING_SALT))

        await (await db).execute<ResultSetHeader>(query.addUser, [email, hashedPassword])

        return 'OK'
    } catch (err: unknown) {
        const e = err as { errno?: number } | null
        if (e && e.errno === 1062)
            return 'User Already Exists'
        return 'An Error Occured'
    }
}


export async function deleteUserfromDB(email: string): Promise<string> {
    const [rows] = await (await db).query<UserRow[]>(query.getUserDetails, [email])
    if (rows.length < 1)
        return email + ' does not exist'
    console.log('[DB]:Deleting User ' + email)
    await (await db).execute<ResultSetHeader>(query.deleteUser, [email])
    return 'OK'
}


export async function updateUserPassword(email: string, currentpassword: string, newpassword: string): Promise<string> {
    try {
        const [rows] = await (await db).execute<UserRow[]>(query.getUserDetails, [email])
        if (rows.length < 1) {
            return 'USER_NOT_FOUND'
        }
        const hashedPassword = rows[0].password
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
        await (await db).execute<ResultSetHeader>(query.updateUserPassword, [newHashedPassword, email])
        return 'OK'
    } catch (err) {
        console.error('[UPDATE PASSWORD ERROR]', err)
        return 'ERROR'
    }
}

export async function getUserDetailsfromDB(email: string, password?: string, check: boolean = true): Promise<userdetailsresponse> {
    try {
        const [rows] = await (await db).execute<UserRow[]>(query.getUserDetails, [email])
        if (rows.length < 1)
            return 'USER_NOT_FOUND'
        if (check)
            return rows[0]
        if (!password)
            return 'ERROR'
        const match: boolean = await bcrypt.compare(password, rows[0].password)
        if (match)
            return rows[0]
        return 'INCORRECT_PASSWORD'

    }
    catch (err) {
        return 'ERROR'
    }
}
