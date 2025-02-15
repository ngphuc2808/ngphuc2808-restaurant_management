import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

import { Role } from "./constants/type";
import { TokenPayload } from "./types/jwt.types";

const managePaths = ["/manage"];
const onlyManagePaths = ["/manage/accounts", "/manage/dashboard"];
const guestPaths = ["/guest"];
const privatePaths = [...managePaths, ...guestPaths];
const unAuthPaths = ["/login"];

export const decodeToken = (token: string) => {
  return jwtDecode(token) as TokenPayload;
};

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // pathname: /manage/dashboard
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  //1. Chưa đăng nhập thì không cho vào private paths
  if (privatePaths.some((path) => pathname.startsWith(path)) && !refreshToken) {
    const url = new URL("/login", request.url);
    url.searchParams.set("clearTokens", "true");
    return NextResponse.redirect(url);
  }

  //2. Đã đăng nhập
  if (refreshToken) {
    //2.1 Đăng nhập rồi thì sẽ không cho vào login nữa
    if (unAuthPaths.some((path) => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    //2.2 Trường hợp đăng nhập rồi, nhưng access token lại hết hạn
    if (
      privatePaths.some((path) => pathname.startsWith(path)) &&
      !accessToken
    ) {
      const url = new URL("/refresh-token", request.url);
      url.searchParams.set("refreshToken", refreshToken);
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }

    //2.3 Vào không đúng role, redirect về trang chủ
    const { role } = decodeToken(refreshToken);
    if (
      (role === Role.Guest &&
        managePaths.some((path) => pathname.startsWith(path))) ||
      (role !== Role.Guest &&
        guestPaths.some((path) => pathname.startsWith(path))) ||
      (role !== Role.Owner &&
        onlyManagePaths.some((path) => pathname.startsWith(path)))
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/manage/:path*", "/guest/:path*", "/login"],
};
