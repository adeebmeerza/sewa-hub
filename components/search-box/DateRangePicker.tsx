"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { buttonVariants } from "../ui/button";
import { useSearch } from "@/app/contexts/search-context";
import { Calendar } from "../ui/calendar";
import CustomButton from "../ui/reusable/custom-button";
import { DateRange } from "react-day-picker";

const DateRangePicker = () => {
  const {
    search: { period },
    setSearch,
  } = useSearch();

  const [selectedDate, setSelectedDate] = useState<DateRange | null>(null);

  return (
    <>
      <Calendar
        initialFocus
        mode="range"
        defaultMonth={period?.from}
        selected={period || undefined}
        onSelect={(date) => setSelectedDate(date!)}
        numberOfMonths={1}
        classNames={{
          head_row: "flex justify-between",
          row: "flex",
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
            "hover:bg-transparent"
          ),
          cell: cn(
            "relative p-0 text-center focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-blue-300 [&:has([aria-selected].day-range-end)]:rounded-r-md",
            "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
          ),
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "size-8 p-0 font-normal aria-selected:opacity-100",
            "hover:bg-primary text-sm"
          ),
          day_today: `bg-blue-500/30`, // Add a border to today's date
          day_range_start:
            "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
          day_range_end:
            "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
          day_range_middle:
            "aria-selected:bg-transparent aria-selected:text-foreground",
          day_selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        }}
        className={cn(
          "bg-background",
          "today:border-blue-600 flex justify-center"
        )}
      />

      <CustomButton
        size="xl"
        className="mt-4 w-full"
        onClick={() => setSearch({ period: selectedDate })}
      >
        Select this period
      </CustomButton>
    </>
  );
};

export default DateRangePicker;
