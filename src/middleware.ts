// middleware.js
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    console.log('middleware.ts');
    // Create a new response object
    let response;

    const url = req.nextUrl;

    // Retrieve the 'token' query parameter
    const token = url.searchParams.get('token');


    if (token) {
        // Remove the 'token' query in url
        url.searchParams.delete('token');

        response = NextResponse.redirect(new URL(url, req.url));

        // Set a cookie
        response.cookies.set('token', token, {
            path: '/',
            maxAge: 60 * 60, // 1 hour in seconds
        });
        return response;
    }



    response = NextResponse.next();

    return response;
}


export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        // "/(api|trpc)(.*)",
    ],
}
