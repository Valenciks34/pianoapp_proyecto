import { useState } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

export const useDateTimePicker = (initialDate) => {
  const [pickedDate, setPickedDate] = useState(initialDate);
  // const [formattedData, setformattedData] = useState("");

  const onDateSelected = (_, selectedDate) => {
    setPickedDate(selectedDate);
    // setformattedData(formatLocateDate(selectedDate));
  };

  const showCalendar = () => {
    DateTimePickerAndroid.open({
      value: pickedDate ?? new Date(),
      onChange: onDateSelected,
      mode: "date",
      is24Hour: true,
    });
  };

  return { pickedDate, showCalendar };
};