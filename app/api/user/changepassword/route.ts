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
        console.log(email.id)
        const msg = await updateUserPassword(await email.id, String(formdata.get('password')), String(formdata.get('newpassword')))
        console.log(await msg)
        return Response.json({ 'msg': await msg })
    }
    catch (err) {
        return Response.json({'msg':'Error'})
    }
}