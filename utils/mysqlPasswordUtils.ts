import { db, query } from "@/lib/mysqldb";
import { error } from "console";

export async function addPasswordtoDB(sitename: string, username: string, password: string, created_by: number): Promise<string> {
    try {
        await (await db).execute(query.createPassword, [username, password, sitename, created_by])
        return 'OK'
    } catch (err) {
        return 'an Error Occured'
        throw err;
    }
}

export async function updatePasswordinDB(username: string, password: string, id: number): Promise<string> {
    try {
        const result=await (await db).execute(query.updatePassword, [username, password, id])
        if(result[0]['affectedRows']===0)
            throw error
        return 'OK'
    }
    catch (err) {
        return 'An Error Occured'
    }
}

export async function deletePasswordfromDB(id: number): Promise<string> {
    try {
        const result=await (await db).execute(query.deletePassword, [id])
        if(result[0]['affectedRows']===0)
            throw error
        return 'OK'
    }
    catch (err) {
        return 'an Error Occured'
        throw err
    }
}

export async function getPasswordfromDB(created_by: number) {
    try {
        const result = await (await db).execute(query.getPasswordsforUID, [created_by])
        return await result[0]
    }
    catch (err) {
        return 'an Error Occured'
        throw err
    }
}