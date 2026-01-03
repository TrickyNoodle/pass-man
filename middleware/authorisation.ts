import { decrypt } from "@/lib/jwt";
import { cookie } from "@/types/cookie";
import { userdetailsresponse } from "@/types/response";
import { getUserDetailsfromDB } from "@/utils/mysqlUserUtils";
import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function authorisation(req: NextRequest) {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('authorisation');
    const tokenCookie = cookieStore.get('authentication');
    if (!authCookie || !tokenCookie) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
        const decryptedId = await decrypt(tokenCookie.value);
        const decryptedEmail = await decrypt(authCookie.value);
        if (typeof decryptedEmail === 'string' || typeof decryptedId === 'string') {
            return NextResponse.redirect(new URL('/login', req.url));
        }
        const userDetails = await getUserDetailsfromDB(decryptedEmail.id, undefined, true);
        if (userDetails && typeof userDetails !== 'string' && userDetails.id === Number(decryptedId.id) && userDetails.email === decryptedEmail.id) {
            return NextResponse.next();
        }

        // If validation fails
        return NextResponse.redirect(new URL('/login', req.url));

    } catch (error) {
        console.error("Auth error:", error);
        return NextResponse.redirect(new URL('/login', req.url));
    }
}