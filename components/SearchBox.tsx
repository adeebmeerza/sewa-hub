"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import CustomButton from "./ui/reusable/custom-button";

import { CalendarIcon, MapPin, Search } from "lucide-react";
import React from "react";
import LocationPickerButton from "./search-box/location-picker-button";
import RentalPeriodButton from "./search-box/rental-period-button";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { useSearchContext } from "@/app/contexts/search-context";

const FormSchema = z.object({
  query: z.string().trim().toLowerCase(),
});

type FormValues = z.infer<typeof FormSchema>;

const SearchBox = ({
  isStackedLayout = false,
  className,
}: {
  isStackedLayout?: boolean;
  className?: string;
}) => {
  const { location, period } = useSearchContext();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      query: "",
    },
  });

  function onSubmit(data: FormValues) {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "search-box space-y-3 lg:py-0 w-full sm:w-9/10 lg:w-full mx-auto flex flex-col rounded-lg items-center",
          isStackedLayout && "bg-gray-50 p-2 sm:bg-transparent sm:p-0",
          className
        )}
      >
        <div className="relative w-full mb-1">
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div
                    className={cn(
                      "search-input-wrapper h-13",
                      isStackedLayout && "lg:h-14"
                    )}
                  >
                    <Search className="text-gray-500" size={16} />
                    <Input
                      placeholder="Search +200 items to rent"
                      className="hidden sm:inline-block border-none shadow-none focus-visible:ring-0 text-sm sm:text-base"
                      type="search"
                      {...field}
                    />
                    <Input
                      placeholder="Search +200 items"
                      className="inline-block sm:hidden border-none shadow-none focus-visible:ring-0 text-sm sm:text-base"
                      type="search"
                      {...field}
                    />
                  </div>
                </FormControl>
                <CustomButton
                  type="submit"
                  variant="default"
                  size="lg"
                  className={cn(
                    "absolute right-2 top-1/2 -translate-y-1/2 rounded-xl px-3 py-0 sm:px-4 gap-0",
                    isStackedLayout && "sm:block hidden"
                  )}
                >
                  <span className="hidden sm:inline">Search items</span>
                  <span className="sm:hidden">Search</span>
                </CustomButton>
              </FormItem>
            )}
          />
        </div>

        {/* Location & Rental Period wrapper */}
        <div
          className={cn(
            "flex justify-center sm:px-2 md:gap-4 w-full",
            !isStackedLayout
              ? "flex-row mb-0 gap-2"
              : "flex-col sm:flex-row gap-0 my-2 sm:w-auto"
          )}
        >
          <FormItem
            className={cn(
              "flex flex-row justify-center items-center gap-2 sm:gap-1",
              isStackedLayout && "flex-1 sm:flex-auto"
            )}
          >
            <FormLabel className="hidden sm:inline-flex text-sm sm:text-blue-300 font-medium gap-2">
              <MapPin size="18" />
              <span>Near</span>
            </FormLabel>
            <LocationPickerButton
              address={location.address}
              forStackedLayout={isStackedLayout}
            />
          </FormItem>
          <FormItem
            className={cn(
              "flex flex-row items-center gap-2 sm:gap-1",
              isStackedLayout && "flex-1 sm:flex-auto"
            )}
          >
            <FormLabel className="hidden sm:inline-flex text-sm sm:text-blue-300 font-medium gap-2">
              <CalendarIcon size="18" />
              <span className="text-nowrap">Rental period</span>
            </FormLabel>
            <RentalPeriodButton
              range={period}
              forStackedLayout={isStackedLayout}
            />
          </FormItem>
        </div>

        {isStackedLayout && (
          <CustomButton
            type="submit"
            variant="default"
            size="lg"
            className="sm:hidden rounded-xl p-5.5 w-full"
          >
            Search
          </CustomButton>
        )}
      </form>
    </Form>
  );
};

export default SearchBox;
