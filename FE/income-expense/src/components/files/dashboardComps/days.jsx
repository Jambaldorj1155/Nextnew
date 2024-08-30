import { Checkbox } from "@/components/ui/checkbox";
import { SvgFood, SvgHouse, SvgLeft, SvgRight } from "..";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockDataToday = [
  {
    svg: SvgHouse,
    title: "Lending & Renting",
    date: "14:00",
    styles: "bg-[#0166FF]",
  },
  {
    svg: SvgFood,
    title: "Food & Drinks",
    date: "14:00",
    styles: "bg-[#FF4545]",
  },
  {
    svg: SvgFood,
    title: "Food & Drinks",
    date: "14:00",
    styles: "bg-[#FF4545]",
  },
  {
    svg: SvgFood,
    title: "Food & Drinks",
    date: "14:00",
    styles: "bg-[#FF4545]",
  },
  {
    svg: SvgFood,
    title: "Food & Drinks",
    date: "14:00",
    styles: "bg-[#FF4545]",
  },
];

const mockDataYesterday = [
  {
    svg: SvgFood,
    title: "Food & Drinks",
    date: "14:00",
    styles: "bg-[#FF4545]",
  },
  {
    svg: SvgFood,
    title: "Food & Drinks",
    date: "14:00",
    styles: "bg-[#FF4545]",
  },
  {
    svg: SvgFood,
    title: "Food & Drinks",
    date: "14:00",
    styles: "bg-[#FF4545]",
  },
  {
    svg: SvgFood,
    title: "Food & Drinks",
    date: "14:00",
    styles: "bg-[#FF4545]",
  },
  {
    svg: SvgFood,
    title: "Food & Drinks",
    date: "14:00",
    styles: "bg-[#FF4545]",
  },
];

export const DashboardDays = () => {
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="p-[6px] rounded-[8px] bg-[#E5E7EB]">
            <SvgLeft />
          </div>
          <p>Last 30 Days</p>
          <div className="p-[6px] rounded-[8px] bg-[#E5E7EB]">
            <SvgRight />
          </div>
        </div>
        <Select>
          <SelectTrigger className="w-[180px] h-[48px] font-semibold leading-6 p-4 bg-[#F9FAFB] rounded-[8px]">
            <SelectValue placeholder="Newest first" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between px-6 py-3 rounded-xl bg-white mt-6">
          <div className="flex items-center gap-4">
            <Checkbox className="size-6" />
            <p className="leading-6">Select all</p>
          </div>
          <div className="text-[#94A3B8] flex font-semibold gap-2">
            <p>-</p>
            <p>35,500₮</p>
          </div>
        </div>
        <p className="font-semibold leading-6">Today</p>
        <div className="flex flex-col gap-3">
          {mockDataToday.map((el, i) => (
            <div
              className="flex justify-between px-6 py-3 rounded-xl bg-white items-center"
              key={el + i}
            >
              <div className="flex items-center gap-4">
                <Checkbox className="size-6" />
                <div
                  className={`${el.styles} size-10 rounded-full flex items-center justify-center`}
                >
                  <el.svg />
                </div>
                <div>
                  <p>{el.title}</p>
                  <p className="text-[#6B7280] text-sm">{el.date}</p>
                </div>
              </div>
              <div className="text-[#94A3B8] flex font-semibold gap-2">
                <p>-</p>
                <p>35,500₮</p>
              </div>
            </div>
          ))}
        </div>
        <p className="font-semibold leading-6">Yesterday</p>
        <div className="flex flex-col gap-3">
          {mockDataYesterday.map((el, i) => (
            <div
              className="flex justify-between px-6 py-3 rounded-xl bg-white items-center"
              key={el + i + 0.1}
            >
              <div className="flex items-center gap-4">
                <Checkbox className="size-6" />
                <div
                  className={`${el.styles} size-10 rounded-full flex items-center justify-center`}
                >
                  <el.svg />
                </div>
                <div>
                  <p>{el.title}</p>
                  <p className="text-[#6B7280] text-sm">{el.date}</p>
                </div>
              </div>
              <div className="text-[#94A3B8] flex font-semibold gap-2">
                <p>-</p>
                <p>35,500₮</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
