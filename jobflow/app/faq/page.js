"use client"
import { useState } from "react";

export default function FAQ() {
  const faqs = [
    {
      question: "What is JobFlow?",
      answer: "It's a website to log and manage your job applications.",
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
      question:
        "How can I ensure that my data isn't being sold to third parties?",
      answer: "We are committed to privacy, and your data will not be sold.",
    },
    {
      question: "Is there a limit on how many applications can be tracked?",
      answer:
        "No, there is no limit. You can apply to 1,000 jobs, and we will track all your applications.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#6b46c1]">
        Frequently Asked Questions
      </h1>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="w-full">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left py-3 px-6 font-semibold text-white bg-[#6b46c1] flex justify-between items-center rounded-lg"
            >
              <span className="flex-1 text-center">{faq.question}</span>
              <span className="text-white">{openIndex === index ? "▲" : "▼"}</span>
            </button>
            {openIndex === index && (
              <p className="px-6 py-3 text-gray-700 text-center bg-gray-100 rounded-b-lg">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}