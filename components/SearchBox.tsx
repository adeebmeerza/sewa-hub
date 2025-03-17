"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomButton from "./CustomButton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import MapContainer from "./google-maps/MapContainer";
import { MapPin } from "lucide-react";
import { APIProvider } from "@vis.gl/react-google-maps";
import { useState } from "react";
import { INITIAL_CENTER } from "./google-maps/GoogleMap";

const FormSchema = z.object({
  query: z.string().trim().toLowerCase(),
  location: z.object({ lat: z.number(), lng: z.number() }).required(),
  date: z.date().nullable(),
});

const SearchBox = () => {
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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      query: "",
      location: { lat: INITIAL_CENTER.lat, lng: INITIAL_CENTER.lng },
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
        className="space-y-2 w-full mx-auto"
      >
        {/* Search Input + Button */}
        <div className="relative">
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative h-16">
                    <Input
                      placeholder="Enter item name to rent ..."
                      {...field}
                      className="h-full bg-background rounded-4xl px-8"
                    />

                    <CustomButton
                      type="submit"
                      variant="default"
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-4xl"
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
        <div className="flex justify-center gap-4">
          <Dialog>
            <DialogTrigger className="cursor-pointer text-white flex items-center gap-2">
              <MapPin size={18} />
              <p className="w-[150px] max-w-[250px] truncate text-eclipsee text-left">
                Near <span>{location.address}</span>
              </p>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="">
                  Where do you want to locate the item?
                </DialogTitle>
              </DialogHeader>

              <div>
                <APIProvider
                  apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
                >
                  <MapContainer location={location} setLocation={setLocation} />
                </APIProvider>
              </div>
            </DialogContent>
          </Dialog>

          <FormItem hidden aria-hidden>
            <FormControl>
              <Input
                placeholder="location"
                value={JSON.stringify(location.center)}
              />
            </FormControl>
          </FormItem>

          <FormItem>
            <FormControl>
              <Input placeholder="period" />
            </FormControl>
          </FormItem>
        </div>
      </form>
    </Form>
  );
};

export default SearchBox;
