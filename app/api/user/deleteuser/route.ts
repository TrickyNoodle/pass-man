import { deleteUserfromDB } from "@/utils/mysqlUserUtils"
import { InvalidFormResponse } from '@/lib/formresponses'

export async function POST(req: Request) {
    const formdata = await req.formData()
    if (!(await formdata.get('email'))) {
        return Response.json(InvalidFormResponse)
    }
    const msg = await deleteUserfromDB(await formdata.get('email'))
    return Response.json({ 'msg': await msg })
}