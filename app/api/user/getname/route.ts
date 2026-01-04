import { cookies } from "next/headers"
import { decrypt } from "@/lib/jwt"
export async function GET() {
    const cookieStore = await cookies()
    const emailcookie = cookieStore.get('authorisation')
    const email = await decrypt(String(emailcookie?.value))
    if (typeof email === 'string')
        return Response.json({ msg: 'Invalid token' })
    return Response.json({ 'msg': email.id })
}