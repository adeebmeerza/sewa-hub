import React from "react";
import CustomButton from "../CustomButton";
import { useSearchController } from "./search-controller";
import { Calendar } from "lucide-react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

const RentalPeriodButton = ({ range }: { range: DateRange | null }) => {
  const { showRentalDateRangePicker } = useSearchController();

  return (
    <CustomButton
      variant="ghost"
      size="sm"
      onClick={(e) => {
        e.preventDefault();
        showRentalDateRangePicker();
      }}
      className="flex-grow text-secondary text-sm sm:text-base font-medium gap-1 justify-start"
    >
      <span className="flex sm:hidden gap-1 items-center">
        <Calendar />
      </span>
      {range?.from && range?.to ? (
        <>
          <span className="sm:hidden">From</span>
          <span className="search-input">
            {format(range.from, "dd")} - {format(range.to, "dd LLL y")}
          </span>
        </>
      ) : range?.from ? (
        <>
          On <span>{format(range.from, "dd LLL y")}</span>
        </>
      ) : (
        "Pick a date"
      )}
    </CustomButton>
  );
};

export default RentalPeriodButton;
