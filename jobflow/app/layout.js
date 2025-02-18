import Head from "next/head";
import "./styles/globals.css";
import Navbar from "./components/Navbar";
import { ClerkProvider, SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          <title><center>Job Flow</center></title>
        </Head>
        <body>
          <Navbar />   
          <main className="p-4">{children}</main>
          <footer className="bg-gray-800 p-4 text-white text-center">
            <p>© 2025 JobFlow</p>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}

