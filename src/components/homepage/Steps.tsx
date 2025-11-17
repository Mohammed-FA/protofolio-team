"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AnimatedDashedArrow = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });

  return (
    <div ref={ref} className="hidden lg:flex justify-center items-center my-10">
      <motion.svg
        width="250"
        height="140"
        viewBox="0 0 250 140"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="6"
            refY="5"
            orient="auto"
          >
            <polygon points="0 0, 10 5, 0 10" fill="black" />
          </marker>
        </defs>

        <motion.path
          d="M20 80 
            C 70 30, 110 30, 130 60 
            C 140 80, 120 100, 140 110 
            C 160 120, 190 110, 210 80"
          stroke="black"
          strokeWidth="2"
          fill="none"
          strokeDasharray="6 6"
          markerEnd="url(#arrowhead)"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{
            duration: 2,
            ease: "linear",
            repeat: isInView ? Infinity : 0,
          }}
        />
      </motion.svg>
    </div>
  );
};

export default AnimatedDashedArrow;
