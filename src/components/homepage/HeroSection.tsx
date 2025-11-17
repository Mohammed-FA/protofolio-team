import React from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "../Comment/Container";
import { Card } from "../ui/card";

export default function HeroSection() {
  return (
    <Card
      className="my-8"
    >
      <Container className=" relative min-h-[40vh] md:flex-nowrap flex-wrap mx-auto flex  justify-between  ">

        <div className="flex max-w-3xl justify-center items-center">
          <div className=" text-center md:text-left relative z-10">

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
        </div>

        <Image
          src={"/assets/images/hero-image.png"}
          alt="Hero"
          className="absolute md:relative top-0 left-0 lg:w-1/2  md:h-auto md:opacity-100 w-full h-full  z-0 opacity-20 "
          width={621}
          height={490}
          priority
        />
      </Container>

    </Card >
  );
}