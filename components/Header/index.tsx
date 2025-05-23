"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuerySpinner } from "@/hooks";
import {
  spinnerService,
  useGetProfileQuery,
  useLogoutMutation,
} from "@/services";
import { ChevronDown, LogOut, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { memo, useCallback, useMemo, useState } from "react";

// Define user type interface
interface User {
  name: string;
  email?: string;
  // Add other user properties as needed
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

const Header = memo(function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/register";
  const { data: userData, isLoading } = useQuerySpinner(
    useGetProfileQuery(undefined, { skip: isAuthPage })
  );
  const router = useRouter();
  const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation();

  const user = userData?.user;

  const handleLogout = useCallback(async () => {
    try {
      spinnerService.startSpinner();
      // await spinnerService.executePromises(logout());
      window.location.href = "/logout";
      // router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      spinnerService.endSpinner();
    }
  }, [logout, router]);

  const handleNavigation = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router]
  );

  const hidden = useMemo(
    () =>
      pathname === "/login" ||
      pathname === "/register" ||
      pathname === "/logout",
    [pathname]
  );

  if (hidden || isLoading || isLogoutLoading) {
    return null;
  }

  return (
    <header className="border-b border-neutral-200 bg-white fixed top-0 left-0 right-0 z-50">
      <div className=" px-4 mx-4 md:mx-8 lg:mx-16 xl:mx-28">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/invoice"
              className={`text-xl font-bold text-white bg-blue-600 uppercase px-4 py-1 rounded-lg transition-colors`}
              prefetch={true}
              // onClick={() => handleNavigation("/invoice")}
            >
              Invoify
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:flex sm:items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                {/* User dropdown menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-gray-100 transition-colors">
                      <Avatar>
                        <AvatarFallback className="bg-blue-600 text-white">
                          {user.name ? getInitials(user.name) : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-700">
                          {user.name}
                        </p>
                      </div>
                      <ChevronDown size={16} className="text-gray-500" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => handleNavigation("/profile")}
                    >
                      <User className="mr-2 h-4 w-4" />
                      My Account
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer text-red-600 focus:text-red-600"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {user ? (
              <>
                <div className="flex items-center px-4 py-2">
                  <Avatar className="h-9 w-9 mr-2 border border-blue-100">
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt={user.name}
                    />
                    <AvatarFallback className="bg-blue-600 text-white text-label">
                      {user.name ? getInitials(user.name) : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-gray-700 font-medium">{user.name}</div>
                </div>
                <div className="px-4 py-2 border-t border-gray-100">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center text-red-600 hover:text-red-700"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
});

export default Header;
