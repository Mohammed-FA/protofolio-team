"use client";
import React, { useState } from "react";


import Logo from "./Logo";
import NavbarList from "./NavbarList";


import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "../ui/sheet";
import Link from "next/link";
import { BsFilterLeft } from "react-icons/bs";

interface NavbarProps {
  type?: string;
  className?: string;
}

export default function Navbar({
  className = "flex-row space-x-10",
}: NavbarProps) {

  const [open, setOpen] = useState<boolean>(false)

  return (
    <header className="bg-lightGray">
      <nav className="flex justify-between  container mx-auto  relative">
        <div className="flex ">
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-black  text-3xl focus:outline-none"
          >
            <BsFilterLeft />

          </button>
          <Logo />
        </div>

        <div className=" flex lg:flex-row lg:items-center lg:justify-between lg:w-4/5">
          <div className="hidden lg:flex">

            <NavbarList type="nav" className={className} />
          </div>

          <div className="flex gap-4 items-center">

            <>
              <Link href="/auth/signin">
                <Button size="lg" className="text-white">
                  login
                </Button>
              </Link>
              <Link href="/auth/signup">

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
              <Link href="/auth/signin">
                <Button size="lg">
                  login
                </Button>
              </Link>
              <Link href="/auth/signup">

                <Button size="lg" variant="outline">
                  signup
                </Button>
              </Link>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
