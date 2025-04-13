import React from "react";
import CustomButton from "../CustomButton";
import { useSearchController } from "./search-controller";
import { Calendar } from "lucide-react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const RentalPeriodButton = ({
  range,
  forStackedLayout = false,
}: {
  range: DateRange | null;
  forStackedLayout?: boolean;
  fullWidthButton?: boolean;
}) => {
  const { showRentalDateRangePicker } = useSearchController();

  return (
    <CustomButton
      variant="ghost"
      size="sm"
      onClick={(e) => {
        e.preventDefault();
        showRentalDateRangePicker();
      }}
      className={cn(
        "text-sm gap-1 font-medium px-1 sm:px-3 hover:bg-secondary/30 hover:text-secondary",
        forStackedLayout
          ? "w-full sm:w-auto justify-center sm:justify-start"
          : "justify-center"
      )}
    >
      <span
        className={cn(
          "sm:hidden inline-flex gap-1 items-center",
          forStackedLayout ? "text-secondary" : "text-blue-300"
        )}
      >
        <Calendar />
      </span>

      {range?.from && range?.to ? (
        <>
          <span
            className={cn(
              "sm:hidden inline-flex gap-1 items-center",
              forStackedLayout ? "text-secondary" : "text-blue-300"
            )}
          >
            From
          </span>
          <span
            className={cn(
              "truncate text-ellipsis font-semibold",
              forStackedLayout
                ? "text-blue-700/90 md:text-blue-200"
                : "text-blue-200"
            )}
          >
            {format(range.from, "dd")} - {format(range.to, "dd LLL")}
          </span>
        </>
      ) : range?.from ? (
        <>
          <span
            className={cn(
              "sm:hidden inline-flex gap-1 items-center",
              forStackedLayout ? "text-secondary" : "text-blue-300"
            )}
          >
            On
          </span>
          <span
            className={cn(
              "truncate text-ellipsis text-blue-700/90 font-semibold",
              forStackedLayout
                ? "text-blue-700/90 md:text-blue-200"
                : "text-blue-200"
            )}
          >
            {format(range.from, "dd LLL")}
          </span>
        </>
      ) : (
        <span
          className={cn(
            "sm:hidden inline-flex gap-1 items-center font-semibold",
            forStackedLayout
              ? "text-blue-700/90 md:text-blue-200"
              : "text-blue-200"
          )}
        >
          Select rental period
        </span>
      )}
    </CustomButton>
  );
};

export default RentalPeriodButton;
