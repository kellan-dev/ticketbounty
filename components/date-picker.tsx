"use client";

import { format } from "date-fns";
import { LucideCalendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

type Props = {
  id: string;
  name: string;
  defaultValue?: string | undefined;
};

export function DatePicker({ id, name, defaultValue }: Props) {
  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : new Date(),
  );

  const formattedStringDate = date ? format(date, "yyyy-MM-dd") : "";

  return (
    <Popover>
      <PopoverTrigger asChild id={id} className="w-full">
        <Button
          variant="outline"
          className="justify-start text-left font-normal"
        >
          <LucideCalendar className="mr-2 h-4 w-4" />
          {formattedStringDate}
          <input type="hidden" name={name} value={formattedStringDate} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
