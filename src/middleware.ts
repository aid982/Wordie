import { auth } from "@/auth"
import { NextResponse, NextRequest } from 'next/server'

export const config = {
    matcher: ['/dashboard/:path*',
    '/words/:path*'],
}
//http://localhost:3000/dashboard/share/clwwbvbn30000foblxzukw62x
 
export default auth((req) => {
  const reqUrl = new URL(req.url);
  if (!req.auth && reqUrl?.pathname !== "/") {
    return NextResponse.redirect(
      new URL(
        `/signin?callbackUrl=${encodeURIComponent(
          reqUrl?.pathname
        )}`,
        req.url
      )
    );
  }
})