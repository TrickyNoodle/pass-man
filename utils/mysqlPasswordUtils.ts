import { db, query } from "@/lib/mysqldb";
import { error } from "console";
import type { RowDataPacket, ResultSetHeader } from 'mysql2'
import { passworddetails } from '@/types/table'

export async function addPasswordtoDB(sitename: string, username: string, password: string, created_by: number): Promise<string> {
    try {
        await (await db).execute<ResultSetHeader>(query.createPassword, [username, password, sitename, created_by])
        return 'OK'
    } catch (err) {
        return 'an Error Occured'
    }
}

export async function updatePasswordinDB(username: string, password: string, id: number): Promise<string> {
    try {
        const [result] = await (await db).execute<ResultSetHeader>(query.updatePassword, [username, password, id])
        if (!result || (result as ResultSetHeader).affectedRows === 0)
            throw error
        return 'OK'
    }
    catch (err) {
        return 'An Error Occured'
    }
}

export async function deletePasswordfromDB(id: number): Promise<string> {
    try {
        const [result] = await (await db).execute<ResultSetHeader>(query.deletePassword, [id])
        if (!result || (result as ResultSetHeader).affectedRows === 0)
            throw error
        return 'OK'
    }
    catch (err) {
        return 'an Error Occured'
    }
}

export async function getPasswordfromDB(created_by: number): Promise<passworddetails[] | string> {
    try {
        const [rows] = await (await db).execute<RowDataPacket[]>(query.getPasswordsforUID, [created_by])
        return rows as passworddetails[]
    }
    catch (err) {
        return 'an Error Occured'
    }
}