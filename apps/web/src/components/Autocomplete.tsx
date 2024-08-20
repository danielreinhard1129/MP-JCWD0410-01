"use client";

import { axiosInstance } from "@/lib/axios";
import { Event } from "@/types/event";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import AsyncSelect from "react-select/async";

interface EventOption {
  label: string;
  value: string;
}

const Autocomplete = () => {
  const router = useRouter();

  const getEventsOptions = async (inputText: string) => {
    const { data } = await axiosInstance.get("/api/events", {
      params: { search: inputText, take: 20 },
    });

    return data?.data.map((event: Event) => ({
      label: event.name,
      value: event.id,
    }));
  };

  const loadOptions = debounce(
    (inputText: string, callback: (option: EventOption[]) => void) => {
      getEventsOptions(inputText).then((option) => callback(option));
    },
    500,
  );

  return (
    <AsyncSelect
      placeholder="Search event"
      loadOptions={loadOptions}
      onChange={(event, actionMeta) => {
        console.log(actionMeta);

        if (actionMeta.action !== "clear") {
          router.push(`/events/${event?.value}`);
        }
      }}
      isClearable={true}
    />
  );
};

export default Autocomplete;
