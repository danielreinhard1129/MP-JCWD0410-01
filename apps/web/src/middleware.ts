import { auth } from "@/lib/auth"

const loggedOutRoutes = [
    "/login",
    "/register",
    "/reset-password",
    "/forgot-password",
]

export default auth((req) => {
const {pathname} = req.nextUrl

const isLoggedOutRoute = loggedOutRoutes.some((route)=>
pathname.startsWith(route)
)


//redirect unauthenticated user to login if they are accessing private route
    // if (!req.auth && !isLoggedOutRoute) {
    //   const newUrl = new URL("/", req.nextUrl.origin)
    //   return Response.redirect(newUrl)
    // }


    //redirect authenticated users away from loggedoutrouter
    if (req.auth && isLoggedOutRoute) {
        const newUrl = new URL("/", req.nextUrl.origin)
        return Response.redirect(newUrl)
      }
  })

  export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  }