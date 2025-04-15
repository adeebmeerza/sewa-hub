import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const footerLinks = {
  about: ["About Us", "FAQ", "Trust & Safety", "Terms & Privacy"],
  resources: ["Support", "Rental Center"],
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
      <div className="wrapper py-8 md:py-12 lg:py-16 flex flex-col sm:flex-row justify-between gap-10">
        <div className="space-y-3">
          <div
            className={`font-raleway text-3xl text-nowrap font-extrabold text-primary`}
          >
            Sewa Hub
          </div>

          <div className="flex flex-row text-gray-600 gap-6">
            {footerLinks.socialMedia.map((link, index) => (
              <Link href={""} key={index}>
                <FontAwesomeIcon
                  icon={link.icon}
                  className="w-6 inline-block"
                />
              </Link>
            ))}
          </div>

          <div className="text-gray-600">© 2025 Sewa Hub</div>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 sm:gap-10 md:gap-15 lg:gap-20">
          <div className="about">
            <h3 className="font-semibold text-black text-base">
              About SewaHub
            </h3>
            {footerLinks.about.map((about, index) => (
              <Link href={""} key={index} className="text-sm">
                {about}
              </Link>
            ))}
          </div>
          <div className="terms">
            <h3 className="font-semibold text-black text-base">
              Terms & Conditions
            </h3>
            {footerLinks.resources.map((term, index) => (
              <Link href={""} key={index} className="text-sm">
                {term}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
