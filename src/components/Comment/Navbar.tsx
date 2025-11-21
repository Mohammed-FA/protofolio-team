"use client";
import React, { useState } from "react";


import Logo from "./Logo";
import NavbarList from "./NavbarList";


import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "../ui/sheet";
import Link from "next/link";
import { BsFilterLeft } from "react-icons/bs";
import { useAuth } from "@/provider/ClinetInfo";
import { Avatar, AvatarImage } from "../ui/avatar";
import { UserModel } from "@/api/type/models/user";
import { Skeleton } from "../ui/skeleton";
import { User } from "lucide-react";
import MenuUser from "./MenuUser";

interface NavbarProps {
  type?: string;
  className?: string;
}


const UserLoading = () => {
  return <div className="flex items-center gap-2 cursor-pointer">
    <Avatar>
      <Skeleton className="h-full w-full rounded-full" />
    </Avatar>
    <Skeleton className="h-4 w-20" />
  </div >

}
const UserInfo = ({ user, logout }: { user: UserModel, logout: () => void }) => {
  return (
    <MenuUser user={user} logout={logout}>
      <div className="flex items-center gap-2 cursor-pointer">
        <Avatar>
          {user.imageurl ? <AvatarImage src={user.imageurl} /> : <div className="h-full w-full rounded-full bg-primary flex justify-center items-center text-white ">
            <User size={18} /></div>}
        </Avatar>
        <span className="font-semibold text-primary">{user.fullName}</span>
      </div>
    </MenuUser>
  );
};

export default function Navbar({
  className = "flex-row space-x-10",
}: NavbarProps) {

  const [open, setOpen] = useState<boolean>(false)
  const { user, loading, logout } = useAuth();

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
            {loading ? <UserLoading /> : user != null ? <UserInfo user={user} logout={logout} /> :
              <>
                <Link href="/signin">
                  <Button size="lg" className="text-white">
                    login
                  </Button>
                </Link>
                <Link href="/signup">

                  <Button size="lg" variant="outline">
                    signup
                  </Button>
                </Link>
              </>
            }
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
              <Link href="/signin">
                <Button size="lg">
                  login
                </Button>
              </Link>
              <Link href="/signup">

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
