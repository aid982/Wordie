import { auth } from "@/auth"

export const config = {
    matcher: ['/dashboard/:path*',
    '/words/:path*'],
}
 
export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/api/auth/signin") {
    const newUrl = new URL("/api/auth/signin", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})