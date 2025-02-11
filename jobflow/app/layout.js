import Head from "next/head";
import "./styles/globals.css";
import Navbar from "./components/Navbar";
import { ClerkProvider, SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          <title>Job Flow</title>
        </Head>
        <body>
          <Navbar />
          <nav className="bg-blue-600 p-4 text-white">
            <h1 className="text-2xl font-bold"> Job Application Tracker </h1>
            <div>
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton showName />
              </SignedIn>
            </div>
          </nav>
          <main className="p-4">{children}</main>
          <footer className="bg-gray-800 p-4 text-white text-center">
            <p>© 2025 JobFlow</p>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}

