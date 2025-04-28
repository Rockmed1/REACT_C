// THIS IS FOR AUTHORIZATION FUNCTIONALITY
// THIS FILE HAS TO BE IN THE ROOT FOLDER, ALL THE WAY OUTSIDE

// import { NextResponse } from "next/server";

// export function middleware(request) {
//   console.log(request);

//   return NextResponse.redirect(new URL("/about", request.url)); // this will create a redirect for every route, including about , resulting in infinit loop
// }

import { auth } from "@/app/_lib/auth";
export const middleware = auth;
// export { auth as middleware } from "@/app/_lib/auth";

// to solve the infinit loop :
export const config = {
  matcher: ["/account/:path*"], // this is the protected route. if false it will redirect to the sign in page
};
