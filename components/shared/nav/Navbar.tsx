"use client";

import { useEffect, useState } from "react";
import { MobileNavDropdown } from "./utils/MobileNavDropdown";
import { LargeNavLinks } from "./utils/LargeNavLinks";
import Logo from "../logo/Logo";
import { ModeToggle } from "../ModeToggle";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // * Listen for scroll events to update sticky behavior.
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // * Update window width state.
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      className={cn(
        "sticky top-2 z-[9999] transition-all transform ease-in-out duration-500 m-3",
        scrolled ? "scale-90" : ""
      )}
    >
      <div className="container mx-auto bg-white dark:bg-stone-950 flex items-center justify-between border rounded-xl p-2 lg:p-4">
        {/* Logo */}
        <Logo />

        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
          {/* Desktop Navigation: Large screen links */}
          {!isMobile && <LargeNavLinks />}

          {/* Mobile Navigation: Render dropdown for mobile devices */}
          {isMobile && <MobileNavDropdown />}

          {/* Mode Toggle */}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
