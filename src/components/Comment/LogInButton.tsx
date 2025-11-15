"use client";
import React, { useState } from "react";

import LoginModal from "./LogInModal";
import Link from "next/link";

interface LogInButtonProps {
  className?: string;
  onClick?: () => void;
}

export default function LogInButton({
  className,
}: // onClick
  LogInButtonProps) {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <>
      <Link
        href="/auth/signin"
        className={`bg-primary w-[159px] h-[45px] text-white px-4 py-2 rounded-lg text-xl text-center ${className}`}
      // onClick={onClick}
      >
        Log In
      </Link>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </>
  );
}
