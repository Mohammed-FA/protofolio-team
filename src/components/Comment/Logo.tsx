import React from "react";

import Link from "next/link";
export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/">
      <div className={`${className || ""} font-dancing md:text-4xl text-3xl text-black font-black`}>Profolio</div>
    </Link>
  );
}
