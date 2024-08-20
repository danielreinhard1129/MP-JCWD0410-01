// import { FC, useState } from "react";
// import DatePicker from "react-datepicker";

// interface DatePickerInputProps {
//   date: Date;
//   onChange: (date: Date | null) => void;
// }

// const DatePickerInput: FC<DatePickerInputProps> = ({ date, onChange }) => {
//   const ExampleCustomTimeInput = ({ date, value, onChange }: any) => (
//     <input
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       style={{ border: "solid 1px pink" }}
//     />
//   );
//   return (
//     <DatePicker
//       selected={date}
//       onChange={onChange}
//       showTimeInput
//       customTimeInput={<ExampleCustomTimeInput />}
//     />
//   );
// };

// export default DatePickerInput;

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateTimePickerProps {
  onDateTimeChange: (date: Date) => void;
  initialDateTime?: Date;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  onDateTimeChange,
  initialDateTime,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    initialDateTime || new Date(),
  );

  const handleChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      onDateTimeChange(date);
    }
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleChange}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      dateFormat="MMMM d, yyyy h:mm aa"
      timeCaption="time"
      className="w-full rounded-md border-[1px] p-2 text-sm"
    />
  );
};

export default DateTimePicker;
