"use client";

import Link from "next/link";
import Image from "next/image";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="bg-[#6b46c1] p-4 text-white flex justify-between items-center">
      {/* Logo only (rectangle, clickable) */}
      <Link href="/" className="flex items-center">
        <Image
          src="/jobflow1.png"
          alt="JobFlow Logo"
          width={60}
          height={400}
          className="object-contain"
        />
      </Link>

      {/* Navigation links and auth */}
      <div className="flex gap-4 items-center">
        <Link href="/">Home</Link>
        <Link href="/jobs">My Applications</Link>
        <Link href="/Analytics">Analytics</Link>
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
