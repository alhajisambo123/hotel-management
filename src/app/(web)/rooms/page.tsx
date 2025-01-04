"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import useSWR from "swr";

import { getRooms } from "@/libs/apis";
import { Room } from "@/models/room";
import Search from "@/components/Search/Search";
import RoomCard from "@/components/RoomCard/RoomCard";

const Rooms = () => {
  const [roomTypeFilter, setRoomTypeFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const searchQueryParam = searchParams.get("searchQuery");
    const roomTypeParam = searchParams.get("roomType");

    if (roomTypeParam) setRoomTypeFilter(roomTypeParam);
    if (searchQueryParam) setSearchQuery(searchQueryParam);
  }, [searchParams]);

  // Fetch data function wrapped in useCallback for stability in SWR
  const fetchData = useCallback(async () => {
    try {
      return await getRooms();
    } catch (error) {
      console.error("Error fetching rooms:", error);
      throw new Error("Failed to fetch rooms");
    }
  }, []);

  // Use SWR for data fetching
  const { data, error, isLoading } = useSWR<Room[]>(
    "get/hotelRooms",
    fetchData
  );

  // Filter rooms based on search query and room type
  const filterRooms = useCallback(
    (rooms: Room[]): Room[] => {
      return rooms.filter((room) => {
        if (
          roomTypeFilter &&
          roomTypeFilter.toLowerCase() !== "all" &&
          room.type.toLowerCase() !== roomTypeFilter.toLowerCase()
        ) {
          return false;
        }

        if (
          searchQuery &&
          !room.name.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }

        return true;
      });
    },
    [roomTypeFilter, searchQuery]
  );

  // Avoid conditional rendering of hooks
  const filteredRooms = data ? filterRooms(data) : [];

  return (
    <div className="container mx-auto pt-10">
      {error && (
        <p className="text-red-500">
          Cannot fetch data. Please try again later.
        </p>
      )}

      <Search
        roomTypeFilter={roomTypeFilter}
        searchQuery={searchQuery}
        setRoomTypeFilter={setRoomTypeFilter}
        setSearchQuery={setSearchQuery}
      />

      <div className="flex mt-20 justify-between flex-wrap">
        {isLoading ? (
          <p className="text-gray-500">Loading...</p>
        ) : filteredRooms.length > 0 ? (
          filteredRooms.map((room) => <RoomCard key={room._id} room={room} />)
        ) : (
          <p className="text-gray-500">No rooms match your search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default Rooms;
