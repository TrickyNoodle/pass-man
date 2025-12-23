import { NextRequest, NextResponse } from "next/server";
import { authorisation } from "./middleware/authorisation";
import Auth from "./middleware/authentication";

const middleware = [Auth, authorisation]

export default async function proxy(req: NextRequest) {
    if (req.nextUrl.pathname === '/api/auth/login')
        return NextResponse.next()
    for (const fn of middleware) {
        const response = await fn(req)
        if (response)
            return response
    }
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/api/:path*'
    ]
};
