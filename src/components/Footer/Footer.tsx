// import Link from "next/link";
// import { BsFillSendFill, BsTelephoneOutbound } from "react-icons/bs";
// import { BiMessageDetail } from "react-icons/bi";

// const Footer = () => {
//   return (
//     <footer className="mt-16 bg-tertiary-light">
//       <div className="container mx-auto px-4">
//         <Link href="/" className="font-black text-tertiary-dark">
//           Dentor
//         </Link>

//         <h4 className="font-semibold text-[40px] py-6">Contact</h4>

//         <div className="flex flex-wrap gap-16 items-center justify-between">
//           <div className="flex-1">
//             <p>Legon,Accra</p>
//             <div className="flex items-center py-4">
//               <BsFillSendFill />
//               <p className="ml-2">codewithlari</p>
//             </div>
//             <div className="flex items-center">
//               <BsTelephoneOutbound />
//               <p className="ml-2">0547038272</p>
//             </div>
//             <div className="flex items-center pt-4">
//               <BiMessageDetail />
//               <p className="ml-2">maijidakhadi@gmail.com</p>
//             </div>
//           </div>

//           <div className="flex-1 md:text-right">
//             <p className="pb-4">Our Story</p>
//             <p className="pb-4">Our Privacy Commitment</p>
//             <p className="pb-4">Terms of service</p>
//             <p>Customer Assistance</p>
//           </div>

//           <div className="flex-1 md:text-right">
//             <p className="pb-4">Basic & Applied Sciences</p>
//             <p className="pb-4">Health sicences</p>
//             <p className="pb-4">Enginering</p>
//             <p className="pb-4">Humanities</p>
//           </div>
//         </div>
//       </div>

//       <div className="bg-tertiary-light h-10 md:h-[70px] mt-16 w-full bottom-0 left-0" />
//     </footer>
//   );
// };

// export default Footer;

import Link from "next/link";
import {
  BsFillSendFill,
  BsTelephoneOutbound,
  BsFacebook,
  BsTwitter,
  BsInstagram,
  BsLinkedin,
} from "react-icons/bs";
import { BiMessageDetail } from "react-icons/bi";

const Footer = () => {
  return (
    <footer className="mt-16 bg-tertiary-light">
      <div className="container mx-auto px-4 py-10">
        <Link href="/" className="font-black text-tertiary-dark text-2xl">
          Dentors
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
