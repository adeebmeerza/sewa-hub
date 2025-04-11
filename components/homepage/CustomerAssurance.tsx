"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import Image from "next/image";

const items = [
  {
    icon: "📦",
    title: "Fast & Easy Rentals",
    description:
      "No complicated processes—just browse, book, and rent. Whether you need an item for a day or a week, we make it quick and hassle-free.",
    imageUrl: "",
  },
  {
    icon: "✅",
    title: "Verified Lenders & Renters",
    description:
      "Every lender and renter is verified, so you can rent with confidence. Plus, user reviews help you choose the best items from trusted owners.",
    imageUrl: "",
  },
  {
    icon: "🔒",
    title: "Safe & Secure Transactions",
    description:
      "We use encrypted payments and trusted verification methods to ensure a seamless and secure rental experience. Your safety is our priority.",
    imageUrl: "",
  },
  {
    icon: "🛡️",
    title: "Damage Protection & Support",
    description:
      "Worried about accidents? We offer optional protection plans and dedicated customer support to assist you every step of the way.",
    imageUrl: "",
  },
];

const CustomerAssurance = () => {
  const defaultOpen = items[0];
  const [openItem, setOpenItem] = useState(defaultOpen.title);

  return (
    <section className="customer-assurance wrapper">
      <h2>Why Rent with Us?</h2>

      <div className="grid gap-8 md:grid-cols-2">
        <Accordion
          type="single"
          collapsible
          className="my-4"
          value={openItem}
          onValueChange={setOpenItem}
        >
          {items.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg text-gray-800 font-inter [&[data-state=open]]:font-semibold [&[data-state=open]]:text-black">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 text-sm sm:text-base">
                {item.description}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden bg-muted">
          {items.map((item, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 {item-${index} === openItem ? "opacity-100" : "opacity-0"} pointer-events-none`}
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* <ol className="grid grid-rows-4 sm:grid-rows-2 sm:grid-cols-2 gap-4 sm:gap-4 my-4">
        {sellingPoints.map((point, index) => (
          <li
            key={index}
            className="border border-gray-300 rounded-lg p-6 my-0 flex flex-col"
          >
            <div className="rounded-full bg-secondary/10 w-16 text-5xl grid place-items-center mb-3">
              {point.icon}
            </div>
            <h3 className="font-semibold font-inter my-2">{point.title}</h3>
            <p className="text-gray-600 text-sm sm:text-base">
              {point.description}
            </p>
          </li>
        ))}
      </ol> */}
    </section>
  );
};

export default CustomerAssurance;
