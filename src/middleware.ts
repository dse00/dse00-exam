// middleware.js
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
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

