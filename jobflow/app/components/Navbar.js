"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Toggle state

  return (
    <>
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

        {/* Hamburger / Close button */}
        <button
          className="md:hidden bg-white p-2 rounded-md focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            // Close (X) icon
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="#6b46c1"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Hamburger icon
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="#6b46c1"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Desktop navigation links (hidden on small screens) */}
        <div className="hidden md:flex gap-4 items-center ml-auto">
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

      {/* Mobile dropdown menu (visible only when isOpen is true) */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center bg-[#6b46c1] text-white p-4 gap-2">
          <Link
            href="/"
            className="w-full text-center px-4 py-2 rounded-md bg-[#7e57c2] hover:bg-white hover:text-[#6b46c1] transition"
          >
            Home
          </Link>
          <Link
            href="/jobs"
            className="w-full text-center px-4 py-2 rounded-md bg-[#7e57c2] hover:bg-white hover:text-[#6b46c1] transition"
          >
            My Applications
          </Link>
          <Link
            href="/Analytics"
            className="w-full text-center px-4 py-2 rounded-md bg-[#7e57c2] hover:bg-white hover:text-[#6b46c1] transition"
          >
            Analytics
          </Link>
          <Link
            href="/about"
            className="w-full text-center px-4 py-2 rounded-md bg-[#7e57c2] hover:bg-white hover:text-[#6b46c1] transition"
          >
            About
          </Link>
          <Link
            href="/faq"
            className="w-full text-center px-4 py-2 rounded-md bg-[#7e57c2] hover:bg-white hover:text-[#6b46c1] transition"
          >
            FAQ
          </Link>

          <div className="flex gap-2 mt-2">
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>

            <SignedIn>
              <UserButton showName />
            </SignedIn>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
