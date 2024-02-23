import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/", // Specifies that "/" i.e. the Homepage is the sign in page.
  },
});

// Config to protect routes included in the matcher.
export const config = {
  matcher: ["/users/:path*"], // Including "/:path*" means "/users/anything/anything2/anything3" etc
};
