"use client";
import React, { useState, useEffect, useRef } from "react";

import SignUpButton from "./SignUpButton";
import LogInButton from "./LogInButton";

import Logo from "./Logo";
import NavbarList from "./NavbarList";

import { signOut } from "next-auth/react";

import Image from "next/image";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

interface NavbarProps {
  type?: string;
  className?: string;
}

function UserAvatar({ imageUrl }: { imageUrl: string }) {
  const validImage =
    imageUrl && imageUrl.trim() !== ""
      ? imageUrl
      : "/assets/default-avatar.png";

  return (
    <Image
      src={validImage}
      alt="User profile"
      width={50}
      height={50}
      className="rounded-full"
      placeholder="blur"
      blurDataURL="data:image/png;base64,..."
    />
  );
}


export default function Navbar({
  className = "flex-row space-x-10",
}: NavbarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"signup" | "login">("login");
  const sidebarRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOpenModal = (type: "signup" | "login") => {
    setIsSidebarOpen(false);
    setModalType(type);
    setIsModalOpen(true);
  };

  // 1. Sidebar effect
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]); // proper cleanup

  // 2. Modal effect
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]); // proper cleanup

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) return;

    await signOut({ callbackUrl: "/" }); // handle both logout and redirect
  };

  return (
    <nav className="flex justify-between py-4 px-12 bg-lightGray relative">
      <Logo />
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
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
            <LogInButton onClick={() => handleOpenModal("login")} />
            <SignUpButton onClick={() => handleOpenModal("signup")} />
          </>
        </div>
      </div>

      {/* Overlay when menu is open */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      )}

      {/* Drawer Menu (Sidebar) */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transition-transform transform z-50 flex flex-col justify-between px-6 py-6 ${isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="absolute top-4 right-4 text-gray-600"
        >
          ✖
        </button>

        <NavbarList
          type="sidebar"
          className="flex-col space-y-6 mt-12 text-lg"
          onClick={() => setIsSidebarOpen(false)}
        />

        <div className="flex flex-col gap-4 pb-6">
          {/* {session?.user ? (
            <>
              <div className="flex gap-4 items-center">
                <UserAvatar imageUrl={session.user.image!} />
                <span>{session.user.name}</span>
              </div>
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
              <LogInButton
                className="w-full text-center"
                onClick={() => handleOpenModal("login")}
              />
              <SignUpButton
                className="w-full text-center"
                onClick={() => handleOpenModal("signup")}
              />
            </>
        </div>
      </div>
      {modalType === "signup" ? (
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
      )}
    </nav>
  );
}
