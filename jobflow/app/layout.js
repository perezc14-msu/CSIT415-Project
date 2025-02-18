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
          <nav className="bg-purple-600 p-4 text-white">
          <h1 className="text-5xl font-extrabold text-center bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4 rounded-lg shadow-lg">
  Job Flow
</h1>

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

