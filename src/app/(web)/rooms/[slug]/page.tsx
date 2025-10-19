// "use client";

// import React, { useState, useEffect, useTransition } from "react";
// import useSWR from "swr";

// import { getRoom } from "@/libs/apis";
// import LoadingSpinner from "../../loading";
// import HotelPhotoGallery from "@/components/HotelPhotoGallery/HotelPhotoGallery";
// import toast from "react-hot-toast";
// import RoomReview from "@/components/RoomReview/RoomReview";

// type RoomDetailsProps = {
//   params: Promise<{ slug: string }>;
// };

// const RoomDetails: React.FC<RoomDetailsProps> = ({ params }) => {
//   const [slug, setSlug] = useState<string | null>(null);

//   const [isPending, startTransition] = useTransition();

//   useEffect(() => {
//     startTransition(() => {
//       params
//         .then((resolvedParams) => {
//           console.log("Resolved Params:", resolvedParams);
//           setSlug(resolvedParams.slug);
//         })
//         .catch((error) => {
//           console.error("Error resolving params:", error);
//           toast.error("Failed to load room details.");
//         });
//     });
//   }, [params]);

//   const fetchRoom = async () => {
//     if (!slug) return null;
//     try {
//       const data = await getRoom(slug);
//       console.log("Fetched Room Data:", data);
//       return data;
//     } catch (error) {
//       console.error("Error fetching room:", error);
//       throw new Error("Cannot fetch data");
//     }
//   };

//   const {
//     data: room,
//     error,
//     isLoading,
//   } = useSWR(slug ? `/api/rooms/${slug}` : null, fetchRoom);

//   if (isLoading || isPending) return <LoadingSpinner />;
//   if (error) {
//     console.error("Error fetching room data:", error);
//     return <p>Error: Unable to fetch tutor details.</p>;
//   }
//   if (!room) return <p>No tutor data available.</p>;

//   return (
//     <div>
//       <HotelPhotoGallery photos={room.images} />

//       <div className="container mx-auto mt-20">
//         <div className="md:grid md:grid-cols-12 gap-10 px-3">
//           <div className="md:col-span-8 md:w-full">
//             <div>
//               <h2 className="font-bold text-left text-lg md:text-2xl">
//                 {room.name}
//               </h2>
//               <div className="flex my-11">
//                 <div className="mb-11">
//                   <h2 className="font-bold text-3xl mb-2">About My Session</h2>
//                   <p>{room.decshin} </p>
//                 </div>
//               </div>
//               <div className="mb-11">
//                 <h2 className="font-bold text-3xl mb-2">About Me</h2>
//                 <p>{room.description}</p>
//               </div>

//               <div className="mb-11">
//                 <h2 className="font-bold text-3xl mb-2">Experience</h2>
//                 <p>{room.experience}</p>
//               </div>
//               <div className="mb-11">
//                 <h2 className="font-bold text-3xl mb-2">Contact me</h2>
//                 <p>{room.contact}</p>
//               </div>
//               <div className="mb-11"></div>

//               <div className="shadow dark:shadow-white rounded-lg p-6">
//                 <div className="items-center mb-4">
//                   <p className="md:text-lg font-semibold">Customer Reviews</p>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <RoomReview roomId={room._id} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RoomDetails;







"use client";

import React, { useState, useEffect, useTransition } from "react";
import useSWR from "swr";

import { getRoom } from "@/libs/apis";
import LoadingSpinner from "../../loading";
import HotelPhotoGallery from "@/components/HotelPhotoGallery/HotelPhotoGallery";
import toast from "react-hot-toast";
import RoomReview from "@/components/RoomReview/RoomReview";

type RoomDetailsProps = {
  params: Promise<{ slug: string }>;
};

interface ContactFormData {
  name: string;
  contact: string;
  message: string;
}

const RoomDetails: React.FC<RoomDetailsProps> = ({ params }) => {
  const [slug, setSlug] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState<ContactFormData>({
    name: "",
    contact: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    startTransition(() => {
      params
        .then((resolvedParams) => {
          console.log("Resolved Params:", resolvedParams);
          setSlug(resolvedParams.slug);
        })
        .catch((error) => {
          console.error("Error resolving params:", error);
          toast.error("Failed to load room details.");
        });
    });
  }, [params]);

  const fetchRoom = async () => {
    if (!slug) return null;
    try {
      const data = await getRoom(slug);
      console.log("Fetched Room Data:", data);
      return data;
    } catch (error) {
      console.error("Error fetching room:", error);
      throw new Error("Cannot fetch data");
    }
  };

  const {
    data: room,
    error,
    isLoading,
  } = useSWR(slug ? `/api/rooms/${slug}` : null, fetchRoom);

  // ✅ handle contact form submission
  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, room: room?.name || slug }),
      });

      if (res.ok) {
        toast.success("Message sent successfully!");
        setForm({ name: "", contact: "", message: "" });
        setShowForm(false);
        setStatus("");
      } else {
        toast.error("Failed to send message.");
        setStatus("Error sending message.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred.");
      setStatus("Error sending message.");
    }
  };

  if (isLoading || isPending) return <LoadingSpinner />;
  if (error) {
    console.error("Error fetching room data:", error);
    return <p>Error: Unable to fetch tutor details.</p>;
  }
  if (!room) return <p>No tutor data available.</p>;

  return (
    <div>
      <HotelPhotoGallery photos={room.images} />

      <div className="container mx-auto mt-20">
        <div className="md:grid md:grid-cols-12 gap-10 px-3">
          <div className="md:col-span-8 md:w-full">
            <div>
              <h2 className="font-bold text-left text-lg md:text-2xl">
                {room.name}
              </h2>
              <div className="flex my-11">
                <div className="mb-11">
                  <h2 className="font-bold text-3xl mb-2">About My Session</h2>
                  <p>{room.decshin} </p>
                </div>
              </div>
              <div className="mb-11">
                <h2 className="font-bold text-3xl mb-2">About Me</h2>
                <p>{room.description}</p>
              </div>

              <div className="mb-11">
                <h2 className="font-bold text-3xl mb-2">Experience</h2>
                <p>{room.experience}</p>
              </div>

              {/* ✅ Contact Section with Form Button */}
              <div className="mb-11">
                {/* <h2 className="font-bold text-3xl mb-2">BoMeok </h2> */}
                {/* <p>{room.contact}</p> */}

                <button
                  onClick={() => setShowForm(true)}
                  className="bg-primary  text-center  p-4 rounded-xl text-white text-xl font-bold hover:-translate-y-2 hover:shadow-lg transition-all duration-500"
    
                >
                  Book Me
                </button>
              </div>

              {/* ✅ Modal Popup Form */}
              {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg relative">
                    <button
                      onClick={() => setShowForm(false)}
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                    >
                      ✕
                    </button>
                    <h3 className="text-xl font-bold mb-4">Send a Message</h3>

                    <form onSubmit={handleContactSubmit} className="space-y-3">
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        className="w-full p-2 border rounded"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Your Contact (phone)"
                        value={form.contact}
                        onChange={(e) =>
                          setForm({ ...form, contact: e.target.value })
                        }
                        className="w-full p-2 border rounded"
                        required
                      />
                      <textarea
                        placeholder="Your Message"
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        className="w-full p-2 border rounded"
                        required
                      />
                      <button
                        type="submit"
                        className="bg-primary  text-center px-4 py-2 rounded-xl text-white text-xl font-bold hover:-translate-y-2 hover:shadow-lg transition-all duration-500"
                      >
                        Send
                      </button>
                      <p className="text-sm mt-2">{status}</p>
                    </form>
                  </div>
                </div>
              )}

              <div className="shadow dark:shadow-white rounded-lg p-6">
                <div className="items-center mb-4">
                  <p className="md:text-lg font-semibold">Customer Reviews</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <RoomReview roomId={room._id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
