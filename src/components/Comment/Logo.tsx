import React from "react";

import Link from "next/link";
export default function Logo() {
  return (
    <Link href="/">
      <div className={`font-dancing md:text-4xl text-3xl font-black`}>Profolio</div>
    </Link>
  );
}
