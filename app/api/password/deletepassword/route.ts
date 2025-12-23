import { InvalidFormResponse } from "@/lib/formresponses";
import { deletePasswordfromDB } from "@/utils/mysqlPasswordUtils";

export async function POST(req: Request) {
    const formdata = await req.formData();
    if (!(formdata.get('id')))
        return Response.json({ 'msg': InvalidFormResponse })
    const msg = await deletePasswordfromDB(parseInt(String(formdata.get('id'))))
    return Response.json({ 'msg': await msg })
}