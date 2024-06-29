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
        </div>
      </div>
    </SectionWrapper>
  );
}

export default ContactSection;
