"use client";

import { useEffect } from "react";
import { incrementWebsiteViews } from "@/lib/actions/websiteViews";

export function ViewCounter() {
  useEffect(() => {
    incrementWebsiteViews().catch(console.error);
  }, []);

  return null;
}
