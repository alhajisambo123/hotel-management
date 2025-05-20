// "use client";

// import Link from "next/link";
// import { useContext,useState } from "react";
// import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
// import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
// // import { useSession } from "next-auth/react";

// import ThemeContext from "@/context/themeContext";
// // import Image from "next/image";

// const Header = () => {
//   const { darkTheme, setDarkTheme } = useContext(ThemeContext);
//   const [menuOpen, setMenuOpen] = useState(false);
//   // const { data: session } = useSession();

//   return (
//     <header className="sticky top-0 z-50 py-10 px-4  container mx-auto  text-xl flex flex-wrap md:flex-nowrap items-center justify-between transition-all duration-300 bg-white dark:bg-black">
//       <div className="flex items-center w-full md:2/3">
//         <Link href="/" className="font-black text-tertiary-dark">
//           Agenda
//         </Link>
//         <ul className="flex items-center ml-5">
//           <li className="flex items-center">
//             {/* {session?.user ? (
//               <Link href={`/users/${session.user.id}`}>
//                 {session.user.image ? (
//                   <div className="w-10 h-10 rounded-full overflow-hidden">
//                     <Image
//                       src={session.user.image}
//                       alt={session.user.name!}
//                       width={40}
//                       height={40}
//                       className="scale-animation img"
//                     />
//                   </div>
//                 ) : (
//                   <FaUserCircle className="cursor-pointer" />
//                 )} */}
//             {/* </Link>
//             ) : ( */}
//             {/* <Link href="/auth">
//                 <FaUserCircle className="cursor-pointer" />
//               </Link>
//             )} */}
//           </li>
//           <li className="ml-2">
//             {darkTheme ? (
//               <MdOutlineLightMode
//                 className="cursor-pointer"
//                 onClick={() => {
//                   setDarkTheme(false);
//                   localStorage.removeItem("hotel-theme");
//                 }}
//               />
//             ) : (
//               <MdDarkMode
//                 className="cursor-pointer"
//                 onClick={() => {
//                   setDarkTheme(true);
//                   localStorage.setItem("hotel-theme", "true");
//                 }}
//               />
//             )}
//           </li>
//         </ul>
//       </div>

//       <ul className="flex items-center justify-between w-full md:w-1/ mt-4 font-bold  btn-primary ">
//         <li className="hover:-translate-y-2 duration-500 transition-all ">
//           <Link href="/">Home</Link>
//         </li>
//         <li className="hover:-translate-y-2 duration-500 transition-all">
//           <Link href="/rooms">Tutors</Link>
//         </li>
//         {/* <li className="hover:-translate-y-2 duration-500 transition-all">
//           <Link href="/about">About us</Link>
//         </li> */}
//         <li className="hover:-translate-y-2 duration-500 transition-all">
//           <Link href="/about">Become a Tutor</Link>
//         </li>

//         {/* <li className="hover:-translate-y-2 duration-500 transition-all">
//           <Link href="/about">How it works</Link>
//         </li> */}
//       </ul>
//     </header>
//   );
// };

// export default Header;

"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import ThemeContext from "@/context/themeContext";

const Header = () => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 py-6 px-4 container mx-auto text-xl bg-white dark:bg-black transition-all duration-300">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-black text-tertiary-dark text-2xl">
          Agenda
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-6 font-bold btn-primary">
          <li className="hover:-translate-y-2 duration-500 transition-all">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:-translate-y-2 duration-500 transition-all">
            <Link href="/rooms">Tutors</Link>
          </li>
          <li className="hover:-translate-y-2 duration-500 transition-all">
            <Link href="/about">Become a Tutor</Link>
          </li>
        </ul>

        {/* Right Icons */}
        <div className="flex items-center gap-4 md:hidden">
          {darkTheme ? (
            <MdOutlineLightMode
              className="cursor-pointer"
              onClick={() => {
                setDarkTheme(false);
                localStorage.removeItem("hotel-theme");
              }}
            />
          ) : (
            <MdDarkMode
              className="cursor-pointer"
              onClick={() => {
                setDarkTheme(true);
                localStorage.setItem("hotel-theme", "true");
              }}
            />
          )}

          {/* Hamburger Button */}
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 font-bold btn-primary">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href="/rooms" onClick={() => setMenuOpen(false)}>
            Tutors
          </Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>
            Become a Tutor
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
