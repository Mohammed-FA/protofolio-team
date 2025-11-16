"use client";
import React, { useState } from "react";


import Logo from "./Logo";
import NavbarList from "./NavbarList";


import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "../ui/sheet";
import Link from "next/link";

interface NavbarProps {
  type?: string;
  className?: string;
}

// function UserAvatar({ imageUrl }: { imageUrl: string }) {
//   const validImage =
//     imageUrl && imageUrl.trim() !== ""
//       ? imageUrl
//       : "/assets/default-avatar.png";

//   return (
//     <Image
//       src={validImage}
//       alt="User profile"
//       width={50}
//       height={50}
//       className="rounded-full"
//       placeholder="blur"
//       blurDataURL="data:image/png;base64,..."
//     />
//   );
// }


export default function Navbar({
  className = "flex-row space-x-10",
}: NavbarProps) {



  const [open, setOpen] = useState<boolean>(false)



  return (
    <nav className="flex justify-between py-4 px-12 bg-lightGray relative">
      <Logo />
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden text-primary focus:outline-none"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>

      {/* Desktop Navbar */}
      <div className="hidden lg:flex lg:flex-row lg:items-center lg:justify-between lg:w-4/5">
        <NavbarList type="nav" className={className} />

        <div className="flex gap-4 items-center">
          {/* {session?.user ? (
            <>
              <UserAvatar imageUrl={session.user.image!} />
              <span>{session.user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <LogInButton onClick={() => handleOpenModal("login")} />
              <SignUpButton onClick={() => handleOpenModal("signup")} />
            </>
          )}      {session?.user ? (
            <>
              <UserAvatar imageUrl={session.user.image!} />
              <span>{session.user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded text-white"
              >
                Logout
              </button>
            </>
          ) : (
          )} */}
          <>
            <Link href="/auth/signin">
              <Button size="lg">
                login
              </Button>
            </Link>
            <Link href="/auth/signin">

              <Button size="lg" variant="outline">
                signup
              </Button>
            </Link>


          </>
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle >

            </SheetTitle>
          </SheetHeader>
          <div className="w-[90%] mx-auto">

            <NavbarList
              type="sidebar"
              className="flex-col space-y-6 mt-12 text-lg"
              onClick={() => setOpen(false)}
            />
          </div>
          <SheetFooter>
            <Button size="lg">
              login
            </Button>
            <Button size="lg" variant="outline">
              signup
            </Button>

          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* {modalType === "signup" ? (
        <SignUpForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          type="signup"
        />
      ) : (
        <SignInForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          type="signin"
        />
      )} */}
    </nav>
  );
}
