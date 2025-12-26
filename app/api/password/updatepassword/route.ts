import { InvalidFormResponse } from "@/lib/formresponses";
import { updatePasswordinDB } from "@/utils/mysqlPasswordUtils";

export async function POST(req: Request) {
    const formdata = await req.formData();
    console.log(formdata)
    if (!(formdata.get('username') && formdata.get('password') && formdata.get('id')))
        return Response.json({ 'msg': InvalidFormResponse })
    const msg = await updatePasswordinDB(String(formdata.get('username')), String(formdata.get('password')), parseInt(String(formdata.get('id'))))
    return Response.json({ 'msg': await msg })
}