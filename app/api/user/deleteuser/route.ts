import { deleteUserfromDB } from "@/utils/mysqlUserUtils"
import { cookies } from "next/headers"
import { decrypt } from "@/lib/jwt"

export async function GET(req: Request) {
    const cookieStore = await cookies()
    const email = await decrypt(String(cookieStore.get('authorisation')?.value))
    const msg = await deleteUserfromDB(email.id)
    return Response.json({ 'msg': await msg })
}