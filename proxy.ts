import { NextRequest, NextResponse } from "next/server";
import { authorisation } from "./middleware/authorisation";
import Auth from "./middleware/authentication";

const middleware = [Auth, authorisation]
const avoidmw: Array<string> = ['/api/auth/login', '/api/user/new']

export default async function proxy(req: NextRequest) {
    if (avoidmw.includes(req.nextUrl.pathname))
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
        '/api/:path*',
        '/dashboard'
    ]
};
