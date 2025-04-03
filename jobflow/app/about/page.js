"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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
        {/* JobFlow Logo */}
        <Image
          src="/jobflow2.png" 
          alt="JobFlow Logo"
          width={80} 
          height={80} 
          className="mx-auto mb-4" 
        />
        <h1 className="title">About Us</h1>
      </div>

      {showDescription && (
        <div className="containerdescription">
          <p className="description">
            Welcome to <strong>Jobflow</strong>, the ideal tool you need to keep track of all your job applications in one place.
            Job searching can be a hassle, with numerous applications being completed each day, to the point you
            can no longer recall what you even applied for. Our platform keeps track of your jobs, interview dates,
            and follow-ups. 
            </p>
            
            <p className="text-lg text-gray-800 leading-relaxed mt-4">
            Whether you're a student, recent graduate, or looking for a career switch, JobFlow ensures you stay
            organized and ahead in your job search. Sign up today and become part of the JobFlow community!
         
          </p>
        </div>
      )}
    </div>
  );
}
