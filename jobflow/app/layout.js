import Head from "next/head";
import "./styles/globals.css";  
import Navbar from "./components/Navbar";  

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>Job Application Tracker</title>
      </Head>
      <body>
        <Navbar />
        <nav className="bg-blue-600 p-4 text-white">
          <h1 className="text-2xl font-bold">Job Application Tracker</h1>
        </nav>
        <main className="p-4">{children}</main>
        <footer className="bg-gray-800 p-4 text-white text-center">
          <p>© 2025 Job Application Tracker</p>
        </footer>
      </body>
    </html>
  );
}

