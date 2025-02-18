"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-purple-600 p-4 text-white flex justify-between">
      <h1 className="text-xl font-bold text-white bg-purple-500 p-3 rounded-lg">Job Tracker</h1>
      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/faq">FAQ</Link>
        <Link href="/sign-in">Sign In</Link>
        <Link href="/sign-up">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
