import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request, context) {
   const cookie = cookies();
   const token = cookie.get("access_token");
   console.log("hadwadaldwao");
   console.log(context);
   if (token && request.pathname == "/") {
      return;
   } else if (!(token && token.value)) {
      return NextResponse.redirect(new URL("/", request.url));
   }
}

// See "Matching Paths" below to learn more
export const config = {
   matcher: ["/pekerja", "/taskmanagement"],
};
