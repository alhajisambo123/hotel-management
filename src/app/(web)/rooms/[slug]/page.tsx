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

const RoomDetails: React.FC<RoomDetailsProps> = ({ params }) => {
  const [slug, setSlug] = useState<string | null>(null);
  
  const [isPending, startTransition] = useTransition();

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
              <div className="mb-11">
                <h2 className="font-bold text-3xl mb-2">Contact me</h2>
                <p>{room.contact}</p>
              </div>
              <div className="mb-11">

              </div>

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
