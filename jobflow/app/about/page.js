"use client";

import { useState, useEffect } from "react";
import "./about.css";

export default function About() {
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDescription(true);
    }, 1);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="about-page">
      <div className="container">
        <h1 className="title">About Us</h1>
      </div>

      {showDescription && (
        <div className="containerdescription">
          <p className="description">
            Welcome to <strong>Jobflow</strong>, the ideal tool you need to keep track of all your job applications in one place.
            Job searching can be a hassle, with numerous applications being completed each day, to the point you
            can no longer recall what you even applied for. Our platform keeps track of your jobs, interview dates,
            and follow-ups. Whether you're a student, recent graduate, or someone looking for a career switch, our
            platform is designed to simplify your job hunt. Sign up today and become part of the Jobflow community!
          </p>
        </div>
      )}
    </div>
  );
}
