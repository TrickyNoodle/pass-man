import { decrypt } from "@/lib/jwt";
import { getPasswordfromDB } from "@/utils/mysqlPasswordUtils";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const cookie=await cookies()
    const authentication=await cookie.get('authentication')
    const decryptedid=await decrypt(authentication?.value)
    try{
        const passwords=await getPasswordfromDB(parseInt(decryptedid.id))
        return Response.json({msg:passwords})
    }
    catch(err){
        return Response.json({'msg':'error'})
    }
}