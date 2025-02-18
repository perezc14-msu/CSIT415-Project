"use client";

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="bg-purple-600 p-4 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold text-white bg-purple-500 p-3 rounded-lg">
        Job Flow
      </h1>

      <div className="flex gap-4">
        <Link href="/">Home</Link>
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
