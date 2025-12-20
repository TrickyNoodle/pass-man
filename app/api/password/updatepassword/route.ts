import { InvalidFormResponse } from "@/lib/formresponses";
import { updatePasswordinDB } from "@/utils/mysqlPasswordUtils";

export async function POST(req: Request) {
    const formdata = await req.formData();
    if (!(formdata.get('username') && formdata.get('password') && formdata.get('id')))
        return Response.json({ 'msg': InvalidFormResponse })
    const msg = await updatePasswordinDB(formdata.get('username'), formdata.get('password'), parseInt(formdata.get('id')))
    return Response.json({ 'msg': await msg })
}