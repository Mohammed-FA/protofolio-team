import React from "react";
import Link from "next/link";

interface NavbarListProps {
  type: string;
  className?: string;
  onClick?: () => void;
}

const NavbarList: React.FC<NavbarListProps> = ({
  type,
  className,
  onClick,
}) => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Templates", path: "/templates" },
    { name: "Your Projects", path: "/projects" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <ul className={`flex ${className}`}>
      {navLinks.map((link, index) => (
        <Link href={link.path} key={index}>
          <li
            className={`cursor-pointer ${
              type === "nav"
                ? "hover:text-primary"
                : type === "footer"
                ? "hover:text-black"
                : "hover:bg-primary hover:text-white hover:rounded-lg hover:p-2"
            }`}
            onClick={onClick}
          >
            {link.name}
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default NavbarList;
