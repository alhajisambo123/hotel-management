"use client";

import React, { useState, useEffect, useTransition } from "react";
import useSWR from "swr";
import { MdOutlineCleaningServices } from "react-icons/md";
import { LiaFireExtinguisherSolid } from "react-icons/lia";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { GiSmokeBomb } from "react-icons/gi";
import axios from "axios";
import { getStripe } from "@/libs/stripe";

import { getRoom } from "@/libs/apis";
import LoadingSpinner from "../../loading";
import HotelPhotoGallery from "@/components/HotelPhotoGallery/HotelPhotoGallery";
import BookRoomCta from "@/components/BookRoomCta/BookRoomCta";
import toast from "react-hot-toast";
import RoomReview from "@/components/RoomReview/RoomReview";
import { FaWhatsapp } from "react-icons/fa"; // Import WhatsApp icon

type RoomDetailsProps = {
  params: Promise<{ slug: string }>;
};

const RoomDetails: React.FC<RoomDetailsProps> = ({ params }) => {
  const [slug, setSlug] = useState<string | null>(null);
  const [checkinDate, setCheckinDate] = useState<Date | null>(null);
  const [checkoutDate, setCheckoutDate] = useState<Date | null>(null);
  const [adults, setAdults] = useState(1);
  const [noOfChildren, setNoOfChildren] = useState(0);
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

  const calcMinCheckoutDate = () => {
    if (checkinDate) {
      const nextDay = new Date(checkinDate);
      nextDay.setDate(nextDay.getDate() + 1);
      return nextDay;
    }
    return null;
  };

  const calcNumDays = () => {
    if (!checkinDate || !checkoutDate) return 0;
    const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
    return Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
  };

  const handleBookNowClick = async () => {
    if (!checkinDate || !checkoutDate) {
      toast.error("Please provide check-in and check-out dates.");
      return;
    }

    if (checkinDate > checkoutDate) {
      toast.error("Check-out date must be after check-in date.");
      return;
    }

    const numberOfDays = calcNumDays();
    const hotelRoomSlug = room?.slug?.current || room?.slug;

    if (!hotelRoomSlug) {
      toast.error("Room slug is missing or invalid.");
      return;
    }

    try {
      const { data: stripeSession } = await axios.post("/api/stripe", {
        checkinDate,
        checkoutDate,
        adults,
        children: noOfChildren,
        numberOfDays,
        hotelRoomSlug,
      });

      const stripe = await getStripe();
      if (stripe) {
        const result = await stripe.redirectToCheckout({
          sessionId: stripeSession.id,
        });

        if (result.error) {
          toast.error("Payment failed.");
        }
      }
    } catch (error) {
      console.error("Error during booking:", error);
      toast.error("An error occurred during booking.");
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
              <div className="mb-11">
                <h2 className="font-bold text-3xl mb-2">Contact me</h2>
                <p>{room.contact}</p>
              </div>
              <div className="mb-11">
                {/* <h2 className="font-bold text-3xl mb-2">Experience</h2> */}
                {/* <div className="grid grid-cols-2">
                  <div className="flex items-center my-1 md:my-0">
                    <MdOutlineCleaningServices />
                    <p className="ml-2 md:text-base text-xs">Daily Cleaning</p>
                  </div>
                  <div className="flex items-center my-1 md:my-0">
                    <LiaFireExtinguisherSolid />
                    <p className="ml-2 md:text-base text-xs">
                      Fire Extinguishers
                    </p>
                  </div>
                  <div className="flex items-center my-1 md:my-0">
                    <AiOutlineMedicineBox />
                    <p className="ml-2 md:text-base text-xs">
                      Disinfections and Sterilizations
                    </p>
                  </div>
                  <div className="flex items-center my-1 md:my-0">
                    <GiSmokeBomb />
                    <p className="ml-2 md:text-base text-xs">Smoke Detectors</p>
                  </div>
                </div> */}
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

          {/* { <div className="md:col-span-4 rounded-xl shadow-lg dark:shadow dark:shadow-white sticky top-10 h-fit overflow-auto">


          </div> } */}
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
