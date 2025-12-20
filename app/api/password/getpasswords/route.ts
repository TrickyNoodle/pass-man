import { InvalidFormResponse } from "@/lib/formresponses";
import { getPasswordfromDB } from "@/utils/mysqlPasswordUtils";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    if (!(await req.nextUrl.searchParams.has('created_by')))
        return Response.json(InvalidFormResponse)
    const msg = await getPasswordfromDB(parseInt(req.nextUrl.searchParams.get('created_by')))
    return Response.json({ 'msg': await msg })
}