"use client";

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import "./navbar.css";
const Navbar = () => {
  return (
<nav className="backgroundColor:#6b46c1 p-4 text-white flex justify-between items-center">
  <Link href="/" className="text-xl font-bold text-white backgroundColor:#6b46c1 p-3 rounded-lg cursor-pointer italic">
    JobFlow
  </Link>

      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/jobs">My Applications</Link>
        <Link href="/application">Analytics</Link>
        <Link href="/about">About</Link>
        <Link href="/faq">FAQ</Link>
        <SignedOut>
          <SignInButton />
          <SignUpButton /> 
        </SignedOut>

        <SignedIn>
          <UserButton showName />
        </SignedIn>
      </div>
    </nav>

  );
};

export default Navbar;
