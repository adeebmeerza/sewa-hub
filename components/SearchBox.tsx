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
import CustomButton from "./CustomButton";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { CalendarIcon, MapPin, Search } from "lucide-react";
import React, { useState } from "react";
import { INITIAL_CENTER } from "./google-maps/GoogleMap";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useUI } from "@/app/contexts/ui-context";
import LocationPickerButton from "./search-box/location-picker-button";
import { useSearch } from "@/app/contexts/search-context";
import RentalPeriodButton from "./search-box/rental-period-button";
import { Input } from "./ui/input";

const FormSchema = z.object({
  query: z.string().trim().toLowerCase(),
});

type FormValues = z.infer<typeof FormSchema>;

const SearchBox = () => {
  const { search } = useSearch();

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
        className="search-box space-y-3 w-full mx-auto flex flex-col bg-gray-50 p-2 rounded-lg items-center"
      >
        {/* Search Input + Button */}
        <div className="relative w-full">
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="search-input-wrapper">
                    <Search className="text-gray-500" size={16} />
                    <Input
                      placeholder="Search +200 items to rent"
                      className="border-none shadow-none focus-visible:ring-0 text-sm sm:text-base"
                      type="search"
                      {...field}
                    />
                  </div>
                </FormControl>
                <CustomButton
                  type="submit"
                  variant="default"
                  size="lg"
                  className="hidden sm:inline-flex absolute right-2 top-1/2 -translate-y-1/2 rounded-xl p-5.5 "
                >
                  Search items
                </CustomButton>
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col justify-center sm:flex-row sm:justify-between sm:w-5/6 sm:mb-0">
          <FormItem className="flex flex-row items-center gap-2">
            <FormLabel className="hidden sm:inline-flex text-base text-secondary font-medium gap-2">
              <MapPin size="18" />
              <span>Near</span>
            </FormLabel>
            <LocationPickerButton address={search.location.address} />
          </FormItem>

          <FormItem className="flex flex-row items-center gap-2">
            <FormLabel className="hidden sm:inline-flex text-base text-secondary font-medium gap-2">
              <CalendarIcon size="18" />
              <span className="text-nowrap">Rental period</span>
            </FormLabel>
            <RentalPeriodButton range={search.period} />
          </FormItem>
        </div>

        <CustomButton
          type="submit"
          variant="default"
          size="lg"
          className="rounded-xl p-5.5 sm:hidden w-full"
        >
          Search
        </CustomButton>
      </form>
    </Form>
  );
};

export default SearchBox;
