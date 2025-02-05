"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <h1 className="text-xl font-bold">Job Tracker</h1>
      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/faq">FAQ</Link>
        <Link href="/login">Login</Link>
        <Link href="/signup">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
