import React, { useState } from "react";
import SectionWrapper from "../SectionWrapper";

function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to API)
    console.log(formData);
  };

  return (
    <SectionWrapper id="contact">
      <h2 className="text-4xl font-bold text-center mb-10">Contact Us!</h2>
      <div className="flex flex-col justify-between lg:flex-row gap-10 lg:gap-5">
        <div className="lg:min-w-[345px]">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
              <input
                type="text"
                name="subject"
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
              <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                rows="4"
                required
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="lg:min-w-[345px] space-y-5">
          <div>
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Contact Information</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Address: 123 Main St, Anytown, USA
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Phone: (123) 456-7890
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Email: contact@medichat.com
            </p>
          </div>
          {/* Optional: Add an embedded Google Map */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Our Location</h3>
            <div className="h-64">
              <iframe
                className="w-full h-full rounded-md"
                frameBorder="0"
                style={{ border: 0 }}
                src="https://www.google.com/maps/embed/v1/place?q=123+Main+St,+Anytown,+USA&key=YOUR_API_KEY"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

export default ContactSection;
