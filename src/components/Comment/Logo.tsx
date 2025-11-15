import React from "react";

import Link from "next/link";
export default function Logo() {
  return (
    <Link href="/">
      <div className={`font-dancing text-4xl font-black`}>Profolio</div>
    </Link>
  );
}
