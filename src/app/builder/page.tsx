"use client"; // مهم جداً

import React, { useState, useEffect } from "react";
import Builder from "@/components/Builder";

export default function Page() {
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return <Builder />;
}
