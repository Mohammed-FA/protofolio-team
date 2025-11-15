"use client";
import React, { useState } from "react";

import SignupModal from "./SignUpModal";
import Link from "next/link";

interface SignUpButtonProps {
  className?: string;
  onClick?: () => void;
}
export default function SignUpButton({
  className,
}: // onClick,
  SignUpButtonProps) {
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);

  return (
    <>
      <Link
        href="/auth/signup"
        className={`w-[159px] h-[45px] border border-primary text-primary px-4 py-2 rounded-lg text-xl text-center ${className}`}
      // onClick={onClick}
      >
        Sign Up
      </Link>

      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setSignupModalOpen(false)}
      />
    </>
  );
}
