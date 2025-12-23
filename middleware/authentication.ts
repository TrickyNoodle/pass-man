import { NextRequest, NextResponse } from "next/server";

export default function Auth(req: NextRequest) {
    if (!req.cookies.get('authentication'))
        return NextResponse.redirect(new URL('/login', req.url))
}
