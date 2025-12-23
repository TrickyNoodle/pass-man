import { InvalidFormResponse } from "@/lib/formresponses";
import { decrypt } from "@/lib/jwt";
import { addPasswordtoDB } from "@/utils/mysqlPasswordUtils";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    const cookieStore = await cookies()
    const formdata = await req.formData();
    const id = await decrypt(String(cookieStore.get('authentication')?.value))
    if (!(formdata.get('username') && formdata.get('password') && formdata.get('sitename') && id.id))
        return Response.json({ 'msg': InvalidFormResponse })
    const msg = await addPasswordtoDB(String(formdata.get('sitename')), String(formdata.get('username')), String(formdata.get('password')), parseInt(String(id.id)))
    return Response.json({ 'msg': await msg })
}