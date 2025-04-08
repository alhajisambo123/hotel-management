// import Image from "next/image";

// const Gallery = () => {
//   return (
//     <div className="mx-auto container py-14 h-full">
//       <div className="flex flex-wrap md:-m-2">
//         <div className="flex w-1/2 flex-wrap">
//           <div className="w-1/2 p-1 md:p-2 h-48">
//             <Image
//               alt="gallery"
//               className="img"
//               src="/images/hero-1.jpeg"
//               width={200}
//               height={200}
//             />
//           </div>
//           <div className="w-1/2 p-1 md:p-2 h-48">
//             <Image
//               alt="gallery"
//               className="img"
//               src="/images/hero-2.jpeg"
//               width={200}
//               height={200}
//             />
//           </div>
//           <div className="w-full p-1 md:p-2 h-48">
//             <Image
//               alt="gallery"
//               className="img"
//               src="/images/hero-3.jpeg"
//               width={200}
//               height={200}
//             />
//           </div>
//         </div>
//         <div className="flex w-1/2 flex-wrap">
//           <div className="w-full p-1 md:p-2 h-48">
//             <Image
//               alt="gallery"
//               className="img"
//               src="/images/hero-1.jpeg"
//               width={200}
//               height={200}
//             />
//           </div>
//           <div className="w-1/2 p-1 md:p-2 h-48">
//             <Image
//               alt="gallery"
//               className="img"
//               src="/images/hero-2.jpeg"
//               width={200}
//               height={200}
//             />
//           </div>
//           <div className="w-1/2 p-1 md:p-2 h-48">
//             <Image
//               alt="gallery"
//               className="img"
//               src="/images/hero-3.jpeg"
//               width={200}
//               height={200}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Gallery;

import Image from "next/image";

const Gallery = () => {
  return (
    <div className="mx-auto container py-14 h-full">
      <div className="flex flex-col gap-12">
        {/* Section 1 */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <Image
              alt="One-on-One Tutoring"
              className="img rounded-xl"
              src="/images/hero-8.jpeg"
              width={500}
              height={300}
            />
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4">
              Personalized One-on-One Tutoring
            </h3>
            <p className="text-gray-600">
              Get tailored support from student tutors who understand your
              struggles and can guide you through challenging topics in a
              friendly, approachable way.
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8">
          <div className="w-full md:w-1/2">
            <Image
              alt="Group Study Sessions"
              className="img rounded-xl"
              src="/images/hero-2.jpeg"
              width={500}
              height={300}
            />
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4">
              Collaborative Group Study Sessions
            </h3>
            <p className="text-gray-600">
              Learn in an interactive environment with student-led group
              discussions, brainstorming sessions, and engaging study techniques
              to boost your knowledge.
            </p>
          </div>
        </div>

        {/* Section 3 */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <Image
              alt="Exam Preparation"
              className="img rounded-xl"
              src="/images/hero-3.jpeg"
              width={500}
              height={300}
            />
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4">
              Exam Preparation Made Easy
            </h3>
            <p className="text-gray-600">
              Get help with past papers, revision techniques, and key exam
              strategies to feel more confident and prepared for your upcoming
              tests.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
