"use client";
import { useState, useRef, useEffect } from "react";

import {
  FaFacebook,
  FaInstagram,
  FaGithub,
  FaGoogle,
} from "react-icons/fa";


import Link from "next/link";

import { usePathname } from "next/navigation";
import Logo from "./Logo";
import NavbarList from "./NavbarList";
import Container from "./Container";

export default function Footer() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  // Calculate isTemplatePage after hooks are called
  const isTemplatePage =
    pathname.startsWith("/templates/") ||
    pathname.startsWith("/controltemplate");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isTemplatePage) return null;

  return (
    <footer className="bg-primary text-white   relative">
      <Container>
        <div className="flex flex-wrap  md:flex-nowrap  space-y-3 justify-between items-center ">

          <div className="sm:w-fit w-full flex justify-center items-center">

            <Logo className="text-white" />
          </div>

          <div className="md:w-full sm:w-fit w-full ">

            <NavbarList type="footer" className="flex-row sm:space-x-10 space-x-3 text-sm sm:text-base  justify-center items-center" />
          </div>
          <div className="flex justify-center items-center md:w-fit w-full ">

            <div className="flex gap-4">
              <Link href="https://facebook.com" target="_blank">
                <FaFacebook
                  className="w-6 h-6 text-white hover:text-blue-500"
                />
              </Link>
              <Link href="https://instagram.com" target="_blank">
                <FaInstagram
                  className="w-6 h-6 text-white hover:text-pink-500"
                />
              </Link>
              <Link href="https://github.com" target="_blank">
                <FaGithub
                  className="w-6 h-6 text-white hover:text-gray-500"
                />
              </Link>
              <Link href="https://google.com" target="_blank">
                <FaGoogle
                  className="w-6 h-6 text-white hover:text-red-500"
                />
              </Link>
            </div>
          </div>
        </div>


        <div className="border-t border-white my-4"></div>

        <p className="text-center text-sm">
          &copy; 2025 Profolio. All Rights Reserved.
        </p>

      </Container>


    </footer>
  );
}
