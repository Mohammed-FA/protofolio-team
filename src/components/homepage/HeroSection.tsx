import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className={`font-lora   bg-lightGray my-8`}
    >
      <div className="container mx-auto flex  justify-between  ">

        <div className="max-w-xl text-center md:text-left h-full">
          <h1 className="text-3xl md:text-4xl leading-tight text-black font-normal md:leading-10">
            Design your{" "}
            <span className="text-primary text-4xl md:text-5xl font-bold">
              FUTURE
            </span>{" "}
            Start creating with just a click !
          </h1>
          <p className="mt-4 text-charcoalGray text-lg md:text-xl font-normal leading-6">
            Design your website in just a few minutes by using one of our
            templates according to your field.
          </p>
          <Link
            href="/templates"
            className="mt-8 inline-block text-primary underline"
          >
            Discover Templates &gt;
          </Link>
        </div>
        <div className="relative bg-black  w-full h-full">
          <Image
            src={"/assets/images/hero-image.png"}
            alt="Hero"
            className="w-full h-full object-cover "
            fill
            priority
          />
        </div>
      </div>

    </section>
  );
}