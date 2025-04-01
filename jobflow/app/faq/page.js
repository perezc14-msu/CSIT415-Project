"use client";

import { useState } from "react";
import "./FAQ.css";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };



  const faqs = [
    {
      question: "What is Job Application Tracker?",
      answer: "It's an app to log and manage your job applications.",
    },
    {
      question: "Is there an app I can download?",
      answer:
        "As of now, we are focusing solely on a website. But in the future, there are plans to launch an app.",
    },
    {
      question: "What should I do if I forget my password?",
      answer:
        'We have an option to reset your password. Click "Reset Password," and a link will be sent to your email.',
    },
    {
      question: "How can I ensure that my data isn't sold to third parties?",
      answer: "We are committed to never share or sell data.",
    },
    {
      question: "Is there a limit on how many applications can be tracked?",
      answer:
        "No, there is no limit. You can apply to 1000 jobs and we will keep track of all your applications.",
    },
  ];

  return (
    <div className="faq-container">
      <h1 className="faq-title">Frequently Asked Questions</h1>

      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${openIndex === index ? "open" : ""}`}
            onClick={() => toggleAnswer(index)}
          >
            <p className="faq-question">{faq.question}</p>
            {openIndex === index && <p className="faq-answer">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
