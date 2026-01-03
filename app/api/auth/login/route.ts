import { InvalidFormResponse } from "@/lib/formresponses";
import { getUserDetailsfromDB } from "@/utils/mysqlUserUtils";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { encrypt } from "@/lib/jwt";
import bcrypt from 'bcrypt'
import { userdetailsresponse } from "@/types/response";
export async function POST(req: NextRequest) {
    const formdata = await req.formData()
    const cookie = await cookies();
    if (!(formdata.get('email') && formdata.get('password')))
        return Response.json(InvalidFormResponse)
    const data: userdetailsresponse = await getUserDetailsfromDB(String(formdata.get('email')), String(formdata.get('password')))
    if (typeof data == 'string')
        return Response.json({ msg: 'UNAUTHORISED', 'summary': data.toString() })
    else {
        const ismatch = await bcrypt.compare(String(formdata.get('password')), String(data.password))
        if (ismatch) {
            encrypt(data.id, '7d').then((id) => {
                cookie.set('authentication', id, {
                    httpOnly: true,
                })
            })
            encrypt(data.email, '1h').then((email) => {
                cookie.set('authorisation', email)
            })
            return Response.json({ 'msg': 'OK' })
        }
        return Response.json({ 'msg': 'INCORRECT_PASSWORD' })
    }
}