import { decrypt } from "@/lib/jwt";
import { getUserDetailsfromDB } from "@/utils/mysqlUserUtils";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function authorisation(req: NextRequest) {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('authorisation');
    const tokenCookie = cookieStore.get('authentication');
    // 1. Check if cookies exist
    if (!authCookie || !tokenCookie) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
        // 2. Decrypt tokens
        const decryptedId = await decrypt(tokenCookie.value);
        const decryptedEmail = await decrypt(authCookie.value);
        // 3. Fetch user and AWAIT the result
        const userDetails = await getUserDetailsfromDB(decryptedEmail.id, undefined, true);
        // 4. Validate user details
        if (userDetails && userDetails.id === decryptedId.id && userDetails.email === decryptedEmail.id) {
            return NextResponse.next();
        }

        // If validation fails
        return NextResponse.redirect(new URL('/login', req.url));

    } catch (error) {
        console.error("Auth error:", error);
        return NextResponse.redirect(new URL('/login', req.url));
    }
}