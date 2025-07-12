import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, BookOpenText, LogOutIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const isSignupPage = location.pathname?.startsWith("/signup");
  const isLoginPage = location.pathname?.startsWith("/login");

  const { logoutMutation } = useLogout();

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full">
          {/* LOGO - ONLY IN THE CHAT PAGE */}
          {(isChatPage || isLoginPage || isSignupPage) && (
            <div className="pl-0">
              <Link to="/" className="flex items-center gap-2.5">
                <BookOpenText className="size-9 text-primary" />
                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
                  LingoLink
                </span>
              </Link>
            </div>
          )}

          {isAuthenticated && isOnboarded ? (
            <>
              <div className="flex items-center gap-3 sm:gap-4 ml-auto">
                <Link to={"/notifications"}>
                  <button className="btn btn-ghost btn-circle">
                    <BellIcon className="h-6 w-6 text-base-content opacity-70" />
                  </button>
                </Link>
              </div>

              <ThemeSelector />

              <div className="avatar">
                <div className="w-9 rounded-full">
                  <img
                    src={authUser?.profilePic}
                    alt="User Avatar"
                    rel="noreferrer"
                  />
                </div>
              </div>

              {/* Logout button */}
              <button
                className="btn btn-ghost btn-circle"
                onClick={logoutMutation}
              >
                <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3 sm:gap-6 ml-auto">
              <Link to="/signup" className="text-primary hover:underline">
                Sign Up
              </Link>

              <Link to="/login" className="text-primary hover:underline">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
