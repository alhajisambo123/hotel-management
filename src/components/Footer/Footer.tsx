import Link from "next/link";
import {
  BsTelephoneOutbound,
  BsFacebook,
  BsTwitter,
  BsInstagram,
  BsLinkedin,
} from "react-icons/bs";
import { BiMessageDetail } from "react-icons/bi";

const Footer = () => {
  return (
    <footer className="mt-16 bg-primary">
      <div className="container mx-auto px-4 py-10">
        <Link href="/" className="font-black text-tertiary-dark text-2xl">
          Agenda
        </Link>

        <h4 className="font-semibold text-[40px] py-6">Contact Details</h4>

        <div className="flex flex-wrap gap-16 items-center justify-between">
          {/* Contact Section */}
          <div className="flex-1">
            <p>Legon, Accra</p>
            <div className="flex items-center py-4"></div>
            <div className="flex items-center">
              <BsTelephoneOutbound />
              <p className="ml-2">0547038272</p>
            </div>
            <div className="flex items-center pt-4">
              <BiMessageDetail />
              <p className="ml-2">maijidakhadi@gmail.com</p>
            </div>
          </div>

          <div className="flex-1 md:text-right">
            <Link href="https://www.facebook.com">
              <p className="pb-4">Our Privacy Commitment</p>
            </Link>
            <Link href="https://www.facebook.com">
              <p className="pb-4">Customer Assistance</p>
            </Link>
            <Link href="https://www.facebook.com">
              <p className="pb-4">Terms of Service</p>
            </Link>
            <Link href="https://www.facebook.com">
              <p className="pb-4">Our Story</p>
            </Link>
          </div>

          <div className="flex-1 md:text-right">
            <p className="pb-4">Basic & Applied Sciences</p>
            <p className="pb-4">Health Sciences</p>
            <p className="pb-4">Engineering</p>
            <p className="pb-4">Humanities</p>
          </div>
        </div>

        <div className="flex justify-center md:justify-start mt-10 space-x-6">
          <Link href="https://www.facebook.com" target="_blank">
            <BsFacebook className="text-2xl hover:text-blue-600 transition duration-300" />
          </Link>
          <Link href="https://www.twitter.com" target="_blank">
            <BsTwitter className="text-2xl hover:text-blue-400 transition duration-300" />
          </Link>
          <Link href="https://www.instagram.com" target="_blank">
            <BsInstagram className="text-2xl hover:text-pink-600 transition duration-300" />
          </Link>
          <Link href="https://www.linkedin.com" target="_blank">
            <BsLinkedin className="text-2xl hover:text-blue-700 transition duration-300" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
