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
    initialDateTime || null,
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
      placeholderText="Click to select a date"
    />
  );
};

export default DateTimePicker;
