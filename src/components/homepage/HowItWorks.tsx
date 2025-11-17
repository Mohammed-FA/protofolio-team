import React from "react";
import Image from "next/image";
import Steps from "./Steps";
import Container from "../Comment/Container";


const features = [
  { icon: "/assets/images/WebsiteImage.gif", title: "Choose A Template" },
  { icon: "/assets/images/WebsiteBuilder.gif", title: "Customize The Template" },
  { icon: "/assets/images/contentCreator.gif", title: "Launch Your Website" },
];

interface FeatureCardProps {
  icon: string;
  title: string;
}

// FeatureCard Component
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title }) => (
  <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md text-center relative">
    <div className="flex justify-center -mt-16">
      <Image src={icon} alt={title} width={130} height={130} />
    </div>
    <p className="mt-8 text-lg md:text-xl text-black font-normal">{title}</p>
  </div>
);
// Main Component
export default function HowItWorks() {
  return (
    <section className="text-center ">
      <Container>

        <div className="mt-10 min-h-[50vh] h-full  my-10 mx-auto">
          <h2 className="text-2xl font-semibold mb-4">How It Works?</h2>
          <div className="flex justify-center h-96">
            <div className="bg-[#F3F3F3] w-[90%]  max-w-5xl   flex items-center justify-center rounded-md mb-10">
              <button className="text-[#828282] border-8 border-[#828282] p-3 text-3xl">
                ▶
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5 justify-around space-y-12 md:space-y-0 md:space-x-6">
          {features.map((feature, index) => (
            <React.Fragment key={index}>
              <FeatureCard icon={feature.icon} title={feature.title} />
              {index !== features.length - 1 && <Steps />}
            </React.Fragment>
          ))}
        </div>
      </Container>

    </section>
  );
}
