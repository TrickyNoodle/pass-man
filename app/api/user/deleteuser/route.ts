import { deleteUserfromDB } from "@/utils/mysqlUserUtils"
import { cookies } from "next/headers"
import { decrypt } from "@/lib/jwt"

export async function GET() {
    const cookieStore = await cookies()
    const email = await decrypt(String(cookieStore.get('authorisation')?.value))
    if (typeof email === 'string')
        return Response.json({ msg: 'Invalid token' })
    const msg = await deleteUserfromDB(email.id)
    return Response.json({ 'msg': msg })
}