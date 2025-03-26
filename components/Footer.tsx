import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const footerLinks = {
  about: ["About Us", "How It Works", "Support Centre", "FAQ"],
  terms: ["Trust & Safety", "Terms & Privacy"],
  socialMedia: [
    {
      icon: faFacebook,
      label: "Facebook",
    },
    {
      icon: faInstagram,
      label: "Instagram",
    },
    {
      icon: faLinkedin,
      label: "LinkedIn",
    },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-gray-200">
      <div className="container mx-auto px-52 py-8 flex flex-row justify-between">
        <div className="flex gap-32">
          <div className="about">
            <h3 className="font-semibold text-sm text-black">About SewaHub</h3>
            {footerLinks.about.map((about, index) => (
              <Link href={""} key={index}>
                {about}
              </Link>
            ))}
          </div>
          <div className="terms">
            <h3 className="font-semibold text-sm text-black">
              Terms & Conditions
            </h3>
            {footerLinks.terms.map((term, index) => (
              <Link href={""} key={index}>
                {term}
              </Link>
            ))}
          </div>
        </div>
        <div className="socialMedia mx-16">
          <h3 className="font-semibold text-sm text-black">Follow Us</h3>
          {footerLinks.socialMedia.map((link, index) => (
            <Link href={""} key={index}>
              <FontAwesomeIcon
                icon={link.icon}
                className="w-4 inline-block mr-2"
              />
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
