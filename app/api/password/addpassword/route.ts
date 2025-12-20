import { InvalidFormResponse } from "@/lib/formresponses";
import { addPasswordtoDB } from "@/utils/mysqlPasswordUtils";

export async function POST(req: Request) {
    const formdata = await req.formData();
    if (!(formdata.get('username') && formdata.get('password') && formdata.get('sitename') && formdata.get('created_by')))
        return Response.json({ 'msg': InvalidFormResponse })
    const msg = await addPasswordtoDB(formdata.get('sitename'), formdata.get('username'), formdata.get('password'), parseInt(formdata.get('created_by')))
    return Response.json({ 'msg': await msg })
}