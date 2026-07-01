"use client";

import { useState } from "react";

import { MapPin, Phone, Mail, ChevronDown } from "lucide-react";

import {
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";

const ContactPage = () => {
  const [selectedService, setSelectedService] = useState("Select a service");
const [isOpen, setIsOpen] = useState(false);

const [formData, setFormData] = useState({
  fullName: "",
  phone: "",
  email: "",
  startDate: "",
  endDate: "",
  location: "",
  message: "",
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = (e) => {
  e.preventDefault();

  const whatsappMessage = `
New Booking Inquiry

Full Name: ${formData.fullName}

Phone: ${formData.phone}

Email: ${formData.email}

Event Start Date: ${formData.startDate}

Event End Date: ${formData.endDate}

Location: ${formData.location}

Service: ${selectedService}

Additional Details:
${formData.message}
`;

  const url = `https://wa.me/919843553377?text=${encodeURIComponent(
  whatsappMessage
)}`;

  window.open(url, "_blank");

  setFormData({
    fullName: "",
    phone: "",
    email: "",
    startDate: "",
    endDate: "",
    location: "",
    message: "",
  });

  setSelectedService("Select a service");
};

  return (
    <section className="w-full bg-white py-8 md:py-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-[0.72fr_1.15fr] gap-10 xl:gap-32 items-start">
          {/* LEFT SIDE */}
          <div className="w-full">
            <h1
              className="
                text-[34px]
                md:text-[36px]
                font-medium
                text-black
                font-['Cormorant_Garamond']
                mb-8
                leading-none
              "
            >
              Get in Touch
            </h1>

            {/* Contact Info */}
            <div className="space-y-7">
              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <MapPin
                    className="text-[#C28B36]"
                    size={24}
                    strokeWidth={1.8}
                  />
                </div>

                <div>
                  <h3
                    className="
                      text-[#C28B36]
                      text-[20px]
                      font-regular
                      font-['Poppins']
                      mb-1
                    "
                  >
                    Studio Location
                  </h3>

                  <p
                    className="
                      text-[#5c5c5c]
                      text-[17px]
                      leading-[26px]
                      font-['Inter']
                    "
                  >
                    21 Thiruvalluvar Nagar East 1st Street, Opposite Nagamuthu
                    Clinic, Kannagi Nagar 60 Feet Road, PN Road, New Busstand,
                    Tirupur-641602, Tamil Nadu
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <Phone
                    className="text-[#C28B36]"
                    size={24}
                    strokeWidth={1.8}
                  />
                </div>

                <div>
                  <h3
                    className="
                      text-[#C28B36]
                      text-[20px]
                      font-regular
                      font-['Poppins']
                      mb-1
                    "
                  >
                    Phone Number
                  </h3>

                  <p
                    className="
                      text-[#5c5c5c]
                      text-[17px]
                      font-['Inter']
                    "
                  >
                    (+91) 98435 53377
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <Mail
                    className="text-[#C28B36]"
                    size={24}
                    strokeWidth={1.8}
                  />
                </div>

                <div>
                  <h3
                    className="
                      text-[#C28B36]
                      text-[20px]
                      font-regular
                      font-['Poppins']
                      mb-1
                    "
                  >
                    Email Address
                  </h3>

                  <p
                    className="
                      text-[#5c5c5c]
                      text-[17px]
                      font-['Inter']
                    "
                  >
                    Stoneshutters@gmail.com
                  </p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="mt-9 mb-8">
              <h4
                className="
      text-[18px]
      tracking-[1px]
      font-medium
      text-[#333]
      font-['Poppins']
      mb-5
    "
              >
                FOLLOW US
              </h4>

              <div className="flex items-center gap-4 flex-wrap">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/message/KPNB2HV2J5VGH1"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="
        w-[46px]
        h-[46px]
        rounded-full
        flex
        items-center
        justify-center
        bg-white
        border
        border-[#ececec]
        shadow-[0_6px_18px_rgba(0,0,0,0.05)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)]
      "
                >
                  <FaWhatsapp className="text-[#25D366]" size={22} />
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/stoneshutters_weddingstudioz?igsh=MWg1dWt2aHI2dWY0dg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="
        w-[46px]
        h-[46px]
        rounded-full
        flex
        items-center
        justify-center
        bg-white
        border
        border-[#ececec]
        shadow-[0_6px_18px_rgba(0,0,0,0.05)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)]
      "
                >
                  <FaInstagram className="text-[#E4405F]" size={20} />
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/profile.php?id=100064322580503"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="
        w-[46px]
        h-[46px]
        rounded-full
        flex
        items-center
        justify-center
        bg-white
        border
        border-[#ececec]
        shadow-[0_6px_18px_rgba(0,0,0,0.05)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)]
      "
                >
                  <FaFacebookF className="text-[#1877F2]" size={18} />
                </a>

                {/* YouTube */}
                <a
                  href="https://www.youtube.com/@stoneshutters"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="
        w-[46px]
        h-[46px]
        rounded-full
        flex
        items-center
        justify-center
        bg-white
        border
        border-[#ececec]
        shadow-[0_6px_18px_rgba(0,0,0,0.05)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)]
      "
                >
                  <FaYoutube className="text-[#FF0000]" size={22} />
                </a>
              </div>
            </div>

            {/* Map */}
            <div
              className="
    w-full
    lg:w-[115%]
    h-[260px]
    rounded-[16px]
    overflow-hidden
    border
    border-[#f0f0f0]
    shadow-[0_12px_35px_rgba(0,0,0,0.06)]
    transition-all
    duration-300
  "
            >
              <iframe
                title="Stone Shutters Wedding Studioz Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.7790927426!2d77.34247307772803!3d11.129823560784798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba907e66975fe49%3A0xa66c58d8ff1c20d5!2sSTONE%20SHUTTERS%20WEDDING%20STUDIOZ%20-%20best%20candid%20photography%20studio!5e0!3m2!1sen!2sin!4v1782906002271!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div
            className="
    bg-white
    border
    border-[#f0f0f0]
    shadow-[0_10px_40px_rgba(0,0,0,0.06)]
    rounded-[18px]

    px-5
    py-6

    md:px-7
    md:py-6

    lg:px-8
    lg:py-8
  "
          >
            {/* Heading */}
            <div className="mb-8">
              <h2
                className="
                  text-[34px]
                  md:text-[40px]
                  font-semibold
                  text-black
                  font-['Cormorant_Garamond']
                  leading-none
                  mb-5
                "
              >
                Booking Inquiry
              </h2>

              {/* Premium Modern Line */}
              <div className="mt-4 mb-2 flex items-center gap-4">
                {/* Gold Main Line */}
                <div className="w-32 h-[2px] bg-[#C28B36] rounded-full" />

                {/* Light Secondary Line */}
                <div className="w-20 h-[1.5px] bg-[#d8d8d8]" />
              </div>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div>
                <label
                  className="
                    block
                    text-[14px]
                    font-medium
                    text-[#444]
                    mb-2
                    font-['Poppins']
                  "
                >
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
  value={formData.fullName}
  onChange={handleChange}
                  placeholder="eg : Barry Allen"
                  className="
                    w-full
                    h-[40px]
                    border
                    border-[#e5e5e5]
                    rounded-[6px]
                    px-4
                    text-[14px]
                    outline-none
                    bg-white
                    font-['Inter']
                    transition-all
                    duration-300
                    focus:border-[#C28B36]
                    focus:shadow-[0_0_0_4px_rgba(194,139,54,0.08)]
                    placeholder:text-[#9a9a9a]
                    placeholder:text-[13px]
                    placeholder:font-normal
                  "
                />
              </div>

              {/* Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Phone */}
                <div>
                  <label
                    className="
                      block
                      text-[14px]
                      font-medium
                      text-[#444]
                      mb-2
                      font-['Poppins']
                    "
                  >
                    Phone Number
                  </label>

                  <input
                    type="text"
                    name="phone"
  value={formData.phone}
  onChange={handleChange}
                    placeholder="eg : 1234567890"
                    className="
                      w-full
                      h-[40px]
                      border
                      border-[#e5e5e5]
                      rounded-[6px]
                      px-4
                      text-[14px]
                      outline-none
                      bg-white
                      font-['Inter']
                      focus:border-[#C28B36]
                      focus:shadow-[0_0_0_4px_rgba(194,139,54,0.08)]

                      placeholder:text-[#9a9a9a]
                      placeholder:text-[13px]
                      placeholder:font-normal
                    "
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    className="
                      block
                      text-[14px]
                      font-medium
                      text-[#444]
                      mb-2
                      font-['Poppins']
                    "
                  >
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
  value={formData.email}
  onChange={handleChange}
                    placeholder="eg : barry123@gmail.com"
                    className="
                      w-full
                      h-[40px]
                      border
                      border-[#e5e5e5]
                      rounded-[6px]
                      px-4
                      text-[14px]
                      outline-none
                      bg-white
                      font-['Inter']
                      focus:border-[#C28B36]
                      focus:shadow-[0_0_0_4px_rgba(194,139,54,0.08)]

                      placeholder:text-[#9a9a9a]
                      placeholder:text-[13px]
                      placeholder:font-normal
                    "
                  />
                </div>
              </div>

              {/* Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* StartDate */}
                <div>
                  <label
                    className="
                      block
                      text-[14px]
                      font-medium
                      text-[#444]
                      mb-2
                      font-['Poppins']
                    "
                  >
                    Event start Date
                  </label>

                  <input
                    type="text"
                    name="startDate"
  value={formData.startDate}
  onChange={handleChange}
                    placeholder="eg : 13/12/2003"
                    className="
                      w-full
                      h-[40px]
                      border
                      border-[#e5e5e5]
                      rounded-[6px]
                      px-4
                      text-[14px]
                      outline-none
                      bg-white
                      font-['Inter']
                      focus:border-[#C28B36]
                      focus:shadow-[0_0_0_4px_rgba(194,139,54,0.08)]

                      placeholder:text-[#9a9a9a]
                      placeholder:text-[13px]
                      placeholder:font-normal
                    "
                  />
                </div>

                {/* End Date */}
                <div>
                  <label
                    className="
                      block
                      text-[14px]
                      font-medium
                      text-[#444]
                      mb-2
                      font-['Poppins']
                    "
                  >
                    Event End Date
                  </label>

                  <input
                    type="text"
                    name="endDate"
  value={formData.endDate}
  onChange={handleChange}
                    placeholder="eg : 15/12/2003"
                    className="
                      w-full
                      h-[40px]
                      border
                      border-[#e5e5e5]
                      rounded-[6px]
                      px-4
                      text-[14px]
                      outline-none
                      bg-white
                      font-['Inter']
                      focus:border-[#C28B36]
                      focus:shadow-[0_0_0_4px_rgba(194,139,54,0.08)]

                      placeholder:text-[#9a9a9a]
                      placeholder:text-[13px]
                      placeholder:font-normal
                    "
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label
                  className="
                    block
                    text-[14px]
                    font-medium
                    text-[#444]
                    mb-2
                    font-['Poppins']
                  "
                >
                  Location
                </label>

                <input
                  type="text"
                  name="location"
  value={formData.location}
  onChange={handleChange}
                  placeholder="eg : Coimbatore"
                  className="
                    w-full
                    h-[40px]
                    border
                    border-[#e5e5e5]
                    rounded-[6px]
                    px-4
                    text-[14px]
                    outline-none
                    bg-white
                    font-['Inter']
                    transition-all
                    duration-300
                    focus:border-[#C28B36]
                    focus:shadow-[0_0_0_4px_rgba(194,139,54,0.08)]
                    placeholder:text-[#9a9a9a]
                    placeholder:text-[13px]
                    placeholder:font-normal
                  "
                />
              </div>

              {/* Service */}
              <div>
                <label
                  className="
      block
      text-[14px]
      font-medium
      text-[#444]
      mb-2
      font-['Poppins']
    "
                >
                  Type of Service
                </label>

                <div className="relative">
                  {/* Selected Box */}
                  <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="
        w-full
        h-[42px]
        border
        border-[#e5e5e5]
        rounded-[8px]
        px-4
        bg-white
        flex
        items-center
        justify-between
        text-[14px]
        text-[#6f6f6f]
        font-['Inter']
        transition-all
        duration-300

        hover:border-[#C28B36]

        focus:border-[#C28B36]
        focus:shadow-[0_0_0_4px_rgba(194,139,54,0.08)]
      "
                  >
                    {selectedService}

                    <ChevronDown
                      size={18}
                      className={`
          text-[#777]
          transition-transform
          duration-300
          ${isOpen ? "rotate-180" : ""}
        `}
                    />
                  </button>

                  {/* Dropdown */}
                  <div
                    className={`
        absolute
        top-[50px]
        left-0
        w-full
        bg-white
        border
        border-[#efefef]
        rounded-[12px]
        shadow-[0_15px_40px_rgba(0,0,0,0.08)]
        overflow-hidden
        z-50

        transition-all
        duration-300
        origin-top

        ${
          isOpen
            ? "opacity-100 scale-y-100 visible"
            : "opacity-0 scale-y-95 invisible"
        }
      `}
                  >
                    {[
                      "Wedding Shoot",
                      "Post & Pre Wedding Shoot",
                      "Candid",
                      "Bharatanatyam",
                      "Baby Shower and Maternity",
                      "Baby Shoot",
                      "Birthday Shoot",
                      "Puberty",
                      "Modeling Photoshoot",
                      "Frames",
                    ].map((service) => (
                      <button
                        key={service}
                        type="button"
                        onClick={() => {
  setSelectedService(service);
  setIsOpen(false);
}}
                        className="
            w-full
            text-left
            px-4
            py-3
            text-[14px]
            text-[#444]
            font-['Inter']

            transition-all
            duration-200

            hover:bg-[#faf7f2]
            hover:text-[#C28B36]
          "
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  className="
                    block
                    text-[14px]
                    font-medium
                    text-[#444]
                    mb-2
                    font-['Poppins']
                  "
                >
                  Additional Details
                </label>

                <textarea
                  rows="4"
                  name="message"
  value={formData.message}
  onChange={handleChange}
                  placeholder="Tell us more about your wedding requirements..."
                  className="
                    w-full
                    border
                    border-[#e5e5e5]
                    rounded-[10px]
                    px-4
                    py-4
                    text-[14px]
                    outline-none
                    bg-white
                    resize-none
                    font-['Inter']
                    focus:border-[#C28B36]
                    focus:shadow-[0_0_0_4px_rgba(194,139,54,0.08)]
                    placeholder:text-[#9a9a9a]
                    placeholder:text-[13px]
                    placeholder:font-normal
                  "
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="
                  w-full
                  h-[46px]
                  bg-[#C28B36]
                  text-white
                  text-[15px]
                  font-medium
                  rounded-[10px]
                  transition-all
                  duration-300
                  hover:bg-black
                  font-['Poppins']
                  mt-2
                "
              >
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
