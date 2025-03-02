'use client';

import Link from 'next/link';
import { useUser, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import "./styles/globals.css";

export default function Home() {
  const { isSignedIn } = useUser(); // Check if the user is signed in
  const { openSignIn } = useClerk(); // Open the sign-in modal
  const router = useRouter(); // For programmatic navigation

  const handleGetStarted = () => {
    if (isSignedIn) {
      // If the user is signed in, redirect to the job listing page
      router.push('/jobs');
    } else {
      // If the user is not signed in, open the sign-in modal
      openSignIn();
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to JobFlow</h1>
          <p>Your ultimate job application tracker. Stay organized, stay ahead.</p>
          <button onClick={handleGetStarted} className="cta-button">
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose JobFlow?</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>Track Applications</h3>
            <p>Easily keep track of all your job applications in one place.</p>
          </div>
          <div className="feature-card">
            <h3>Set Reminders</h3>
            <p>Never miss an interview or follow-up with built-in reminders.</p>
          </div>
          <div className="feature-card">
            <h3>Analyze Progress</h3>
            <p>Gain insights into your job search with detailed analytics.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 JobFlow. All rights reserved.</p>
      </footer>
    </div>
  );
}
