
import Image from "next/image";
import Container from "../Comment/Container";
import { Card } from "../ui/card";

const features = [
  { icon: "/assets/icons/Professional.png", title: "Professional & Ready-Made Templates" },
  { icon: "/assets/icons/Error.png", title: "Easy Customization With No Coding Required" },
  { icon: "/assets/icons/Publishing.png", title: "One-Click Export & Publishing" },
  { icon: "/assets/icons/Growth.png", title: "Scalability & Growth" },
  { icon: "/assets/icons/Support.png", title: "Continuous Technical Support" },
];

export default function WhyUs() {
  return (
    <Card className=" ">
      <Container >
        <h2 className="text-2xl font-semibold text-center mb-12 md:mb-20">
          Why Us?
        </h2>
        <div className="grid grid-cols-1 xxsm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-16 lg:gap-y-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-md text-center relative overflow-visible"
            >
              <div className="flex justify-center -mt-16">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={130}
                  height={130}
                  className="rounded-full"
                />
              </div>
              <p className="mt-10 text-lg md:text-xl text-black leading-5 font-normal">
                {feature.title}
              </p>
            </div>
          ))}
        </div>
      </Container>

    </Card>
  );
}