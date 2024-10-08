"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EventCard from "@/components/EventCard";
import Pagination from "./components/Pagination";
import useGetEvents from "@/hooks/api/event/useGetEvents";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { debounce } from "lodash";
import Link from "next/link";
import useGetCategories from "@/hooks/api/category/useGetCategories";
import EventCardSkeleton from "@/components/EventCardSkeleton";

const EventPage = () => {
  const searchParams = useSearchParams();

  const category = searchParams.get("category");

  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(category || "");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [page, setPage] = useState(1);

  const { data, isPending } = useGetEvents({
    page,
    take: 8,
    sortBy: "startDate",
    sortOrder: "desc",
    search: searchValue,
    category: selectedCategory,
    location: selectedLocation,
  });

  const { data: item } = useGetCategories();

  const onChangePage = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  // Debounce function to delay the search input
  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        setSearchValue(value);
      }, 300),
    [setSearchValue],
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  };

  const handleSelectCategory = (value: string) => {
    if (value === "all") {
      return setSelectedCategory("");
    }
    setSelectedCategory(value);
  };

  const handleSelectLocation = (value: string) => {
    if (value === "all") {
      return setSelectedLocation("");
    }
    setSelectedLocation(value);
  };

  return (
    <div className="bg-[#fbfbfb]">
      <div className="mx-auto max-w-7xl space-y-8 px-4 pb-20 pt-8 sm:gap-8">
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="text-sm">
            <input
              className="block w-full rounded-md border-[1px] border-neutral-300 py-[9px] pl-3 pr-3 shadow-sm placeholder:text-sm placeholder:text-black focus:border-color1 focus:bg-white focus:outline-none sm:w-[200px] sm:text-sm"
              placeholder="Search Event"
              type="text"
              name="search"
              value={searchValue}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Select
              onValueChange={handleSelectCategory}
              defaultValue={category || ""}
            >
              <SelectTrigger className="sm:w-[200px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="all">All</SelectItem>
                  {item?.map((categories, index: number) => {
                    return (
                      <SelectItem value={categories.title} key={index}>
                        {categories.title.charAt(0).toUpperCase() +
                          categories.title.slice(1).toLowerCase()}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select onValueChange={handleSelectLocation}>
              <SelectTrigger className="sm:w-[200px]">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Location</SelectLabel>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="bali">Bali</SelectItem>
                  <SelectItem value="bandung">Bandung</SelectItem>
                  <SelectItem value="bogor">Bogor</SelectItem>
                  <SelectItem value="jakarta">Jakarta</SelectItem>
                  <SelectItem value="medan">Medan</SelectItem>
                  <SelectItem value="palembang">Palembang</SelectItem>
                  <SelectItem value="surabaya">Surabaya</SelectItem>
                  <SelectItem value="yogyakarta">Yogyakarta</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {isPending && (
            <>
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
            </>
          )}
          {data?.data?.map((event, index: number) => {
            return (
              <Link href={`/events/${event.id}`} key={index}>
                <EventCard
                  key={index}
                  name={event.name}
                  thumbnail={event.thumbnail}
                  location={event.location}
                  startDate={event.startDate}
                  endDate={event.endDate}
                  price={event.price}
                  organizer={event.user.name}
                  profilePic={event.user.profilePic}
                  profileOrganizer={`/organizer/${event.user.id}`}
                />
              </Link>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Pagination
            total={data?.meta?.total || 0}
            limit={data?.meta?.take || 0}
            onChangePage={onChangePage}
            page={page}
          />
        </div>
      </div>
    </div>
  );
};

export default EventPage;
