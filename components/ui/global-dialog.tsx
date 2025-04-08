"use client";

import { useUI } from "@/app/contexts/ui-context";
import useMediaQuery from "@/app/hooks/use-media-query";
import React, { useCallback, useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { Button } from "./button";
import { ArrowLeft, X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "./drawer";

const GlobalDialog = () => {
  const { isOpen, closeDialog, dialogContent } = useUI();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleClose = useCallback(() => {
    dialogContent?.onClose?.();
    closeDialog();
  }, [dialogContent, closeDialog]);

  // handle escpae key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, handleClose]);

  if (!dialogContent) {
    return null;
  }

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
        <DialogContent className="sm:max-w-[425px] pt-2">
          <div className="flex flex-row-reverse items-center justify-between text-gray-600 py-1 relative">
            <DialogClose asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="relative -right-2"
              >
                <X className="size-6" />
              </Button>
            </DialogClose>
            {dialogContent.showBackButton && dialogContent.onBackClick && (
              <Button
                variant="ghost"
                size="icon"
                onClick={dialogContent.onBackClick}
                className="relative -left-2 "
              >
                <ArrowLeft className="size-6" />
                <span className="sr-only">Back</span>
              </Button>
            )}
          </div>

          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {dialogContent.title}
            </DialogTitle>
            <DialogDescription className="text-base">
              {dialogContent.description}
            </DialogDescription>
          </DialogHeader>
          <div>{dialogContent.content}</div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => !open && handleClose()}
      autoFocus={isOpen}
    >
      <DrawerContent className="px-0 pb-10">
        <div className="flex flex-row-reverse items-center justify-between text-gray-600 py-1 px-6">
          <DrawerClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="justify-end"
              onClick={handleClose}
            >
              <X className="size-6" />
            </Button>
          </DrawerClose>
          {dialogContent.showBackButton && dialogContent.onBackClick && (
            <Button
              variant="ghost"
              size="icon"
              className="justify-start"
              onClick={dialogContent.onBackClick}
            >
              <ArrowLeft className="size-6" />
              <span className="sr-only">Back</span>
            </Button>
          )}
        </div>

        <div className="px-6 overflow-y-scroll">
          <DrawerHeader className="p-0 my-2">
            <DrawerTitle>{dialogContent.title}</DrawerTitle>
            <DrawerDescription>{dialogContent.description}</DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-scroll">{dialogContent.content}</div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default GlobalDialog;
