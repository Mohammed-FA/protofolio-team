"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function TemplatesGrid() {
  const router = useRouter();

  const templates = [
    {
      title: "Restaurant Website",
      name: "restaurant",
      link: "/assets/resturant-cover.png",
    },
    {
      title: "Dentist Website",
      name: "dentist",
      link: "/assets/dental-cover.png",
    },
    {
      title: "Programmer Website",
      name: "programmer",
      link: "/assets/programmer-cover.png",
    },
    {
      title: "Company Website",
      name: "company",
      link: "/assets/company-cover.png",
    },
    {
      title: "Software Developer Website",
      name: "developer",
      link: "/assets/developer-cover.png",
    },
  ];
  return (
    <section className="bg-lightGray  md:px-12">
      <div className="container mx-auto">

        <h2 className="text-2xl font-semibold text-left mb-12">
          Templates
        </h2>
        <div className="grid grid-cols-1 xxsm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-10  cursor-pointer">
          {templates.slice(1, 5).map((item, index) => (
            <div
              key={index}
              className="text-center relative"
              onClick={() =>
                router.push(`/controltemplate?template=${item.name}`)
              }
            >
              <Image
                src={item.link as string}
                alt={item.name || "Template Image"}
                width={350}
                height={300}
                className="w-full h-full rounded-xl"
              />

              <p className="text-black text-xl mt-2 text-center">{item.name}</p>
            </div>
          ))}
        </div>
        <Link href="/templates">
          <button className="mt-20 px-6 py-2 text-white block mx-auto bg-primary w-[159px] h-[45px] rounded-lg text-xl">
            Show More
          </button>
        </Link>
      </div >
    </section>

  );
}