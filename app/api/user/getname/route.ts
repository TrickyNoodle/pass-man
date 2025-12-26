import { cookies } from "next/headers"
import { decrypt } from "@/lib/jwt"
import { InvalidFormResponse } from "@/lib/formresponses"
export async function GET(req: Request) {
    const cookieStore = await cookies()
    const emailcookie = cookieStore.get('authorisation')
    const email = await decrypt(String(emailcookie?.value))
    return Response.json({ 'msg': email.id })
}