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
import { Input } from "@/components/ui/input";
import CustomButton from "./CustomButton";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import MapContainer from "./google-maps/MapContainer";
import { CalendarIcon, MapPin, Search } from "lucide-react";
import { APIProvider } from "@vis.gl/react-google-maps";
import React, { useState } from "react";
import { INITIAL_CENTER } from "./google-maps/GoogleMap";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import Link from "next/link";

const popularItems = [
  "Stuff Wagon",
  "Driller",
  "Wet & dry vacuum",
  "DJI Mavic Air",
  "Insta 360",
];

const FormSchema = z.object({
  query: z.string().trim().toLowerCase(),
  location: z.object({ lat: z.number(), lng: z.number() }).required(),
  date: z.date().nullable(),
});

const SearchBox = () => {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [location, setLocation] = useState<{
    address: string;
    center: {
      lat: number;
      lng: number;
    } | null;
  }>({
    address: "Kuala Lumpur",
    center: {
      lat: 3.152815,
      lng: 101.703651,
    },
  });
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 2),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      query: "",
      location: INITIAL_CENTER,
      date: null,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
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
        className="space-y-3 w-full mx-auto"
      >
        {/* Search Input + Button */}
        <div className="relative">
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative h-15">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 rounded-xl text-gray-500" />
                    <Input
                      placeholder="Search +200 items to rent"
                      {...field}
                      className="h-full rounded-2xl px-8 pl-10 bg-blue-50 border border-blue-200 shadow-md text-base! text-primary"
                    />

                    <CustomButton
                      type="submit"
                      variant="default"
                      size="lg"
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl p-5.5"
                    >
                      Search items
                    </CustomButton>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Location + Date */}
        <div className="flex justify-center gap-16 query-details">
          <FormItem className="flex flex-row items-center gap-2">
            <FormLabel className="text-base text-secondary font-normal gap-1">
              <MapPin />
              <span>Near</span>
            </FormLabel>
            <FormControl>
              <div>
                <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
                  <DialogTrigger
                    className="cursor-pointer flex items-center gap-2"
                    asChild
                  >
                    <Button
                      asChild
                      variant="outline"
                      size="default"
                      className="hover:bg-secondary"
                    >
                      <Input
                        value={location.address}
                        readOnly
                        className="min-w-35 w-50 truncate text-ellipsis text-left font-medium bg-blue-50 text-secondary"
                      />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-center mb-4">
                        Where do you want to locate the item?
                      </DialogTitle>
                    </DialogHeader>

                    <div>
                      <APIProvider
                        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
                      >
                        <MapContainer
                          location={location}
                          setLocation={setLocation}
                        />
                      </APIProvider>
                    </div>

                    <DialogFooter>
                      {/* Display address */}
                      <div className="rounded shadow-lg text-center p-2 flex flex-col w-full">
                        <div className="flex items-center justify-center h-12 text-center">
                          <p className="text-sm text-gray-700 flex items-start mb-2">
                            <MapPin
                              className="text-blue-400 shrink-0 mr-2"
                              size="16"
                            />
                            <span className="line-clamp-2">
                              {location.address}
                            </span>
                          </p>
                        </div>

                        <Button
                          variant="secondary"
                          size="lg"
                          className="w-full"
                          // onClick={fetchAddressFromCenter}
                        >
                          Use this location
                        </Button>
                      </div>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </FormControl>
          </FormItem>

          {/* Rental period */}
          <FormItem className="flex flex-row items-center gap-2">
            <FormLabel className="text-base text-secondary font-normal gap-1">
              <CalendarIcon />
              <span className="text-nowrap">Rental period</span>
            </FormLabel>
            <FormControl>
              <div className={cn("grid gap-2")}>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="default"
                      className="hover:bg-secondary"
                      asChild
                    >
                      {date?.from ? (
                        date.to ? (
                          <Input
                            value={`
                                  ${format(date.from, "LLL dd, y")}
                                   - 
                                  ${format(date.to, "LLL dd, y")}
                                `}
                            readOnly
                            className="min-w-50 max-w-max truncate text-ellipsis text-left font-medium bg-blue-50 text-secondary"
                          />
                        ) : (
                          <Input
                            value={format(date.from, "LLL dd, y")}
                            readOnly
                            className="min-w-50 max-w-max truncate text-ellipsis text-left font-medium bg-blue-50 text-secondary"
                          />
                        )
                      ) : (
                        <span className="min-w-50 max-w-max truncate text-ellipsis text-left font-medium bg-blue-50 text-secondary">
                          Pick a date
                        </span>
                      )}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-auto">
                    <DialogHeader>
                      <DialogTitle className="text-center mb-4">
                        Select rental period
                      </DialogTitle>
                    </DialogHeader>

                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={1}
                      classNames={{
                        nav_button: cn(
                          buttonVariants({ variant: "outline" }),
                          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                          "hover:bg-transparent"
                        ),
                        cell: cn(
                          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-blue-300 [&:has([aria-selected].day-range-end)]:rounded-r-md",
                          "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                        ),
                        day: cn(
                          buttonVariants({ variant: "ghost" }),
                          "size-8 p-0 font-normal aria-selected:opacity-100",
                          "hover:bg-primary"
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
                      // className={cn(
                      //   "bg-background rounded border border-blue-100 shadow",
                      //   "today:border-blue-600"
                      // )}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </FormControl>
          </FormItem>
        </div>
      </form>
    </Form>
  );
};

export default SearchBox;
