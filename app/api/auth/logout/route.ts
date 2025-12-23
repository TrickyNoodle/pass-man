import { cookies } from "next/headers";

export async function GET(req:Request){
    const cookieStore=await cookies()
    cookieStore.delete('authentication')
    cookieStore.delete('authorisation')
    return Response.json('ok')
}