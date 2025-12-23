import { InvalidFormResponse } from "@/lib/formresponses"
import { addUsertoDB } from "@/utils/mysqlUserUtils"

export async function POST(req: Request) {
    const formdata = await req.formData()
    if (!(formdata.get('email') && formdata.get('password'))) {
        return Response.json(InvalidFormResponse)
    }
    const msg = await addUsertoDB(String(formdata.get('email')), String(formdata.get('password')))
    return Response.json({ 'msg': await msg })
}