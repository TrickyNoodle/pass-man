import { updateUserPassword } from "@/utils/mysql"
import { InvalidFormResponse } from '@/lib/formresponses'

export async function POST(req: Request) {
    const formdata = await req.formData()
    if (!(await formdata.get('email') && await formdata.get('password') && await formdata.get('newpassword'))) {
        return Response.json(InvalidFormResponse)
    }
    const msg = await updateUserPassword(await formdata.get('email'), await formdata.get('password'), await formdata.get('newpassword'))
    console.log(await msg)
    return Response.json({ 'msg': await msg })
}