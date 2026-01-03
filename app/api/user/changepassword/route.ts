import { updateUserPassword } from "@/utils/mysqlUserUtils"
import { InvalidFormResponse } from '@/lib/formresponses'
import { cookies } from "next/headers"
import { decrypt } from "@/lib/jwt"

export async function POST(req: Request) {
    try {
        const formdata = await req.formData()
        const cookieStore = await cookies()
        if (!(formdata.get('newpassword'))) {
            return Response.json(InvalidFormResponse)
        }
        const emailcookie = cookieStore.get('authorisation')
        const email = await decrypt(String(emailcookie?.value))
        if (typeof email === 'string')
            return Response.json(InvalidFormResponse)
        const msg = await updateUserPassword(email.id, String(formdata.get('password')), String(formdata.get('newpassword')))
        return Response.json({ 'msg': msg })
    }
    catch (err) {
        return Response.json({'msg':'Error'})
    }
}