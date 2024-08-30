"use client";

import { Button } from "../ui/button";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SvgAdd, SvgPlus } from ".";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import axios from "axios";

const TRANSACTION_TYPES = {
  EXPENSE: "EXP",
  INCOME: "INC",
};

export const AddButton = (props) => {
  const [transactionType, setTransactionType] = useState("EXP");
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:8000/category');
      setData(res.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchData()
}, [])

  const [date, setDate] = useState(null);
  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id: userId } = JSON.parse(localStorage.getItem("user"));
   
    const formData = new FormData(formRef.current);

    const mockData = Object.fromEntries(formData.entries());

    const myData = {
      ...mockData,
      userId: userId,
      transactionType: transactionType,
    }

    console.log(myData)

    try {
      const response = await axios.post("http://localhost:8000/record/create", myData);
      if (response.status === 201) {
        console.log("successfully added record");
      } else {
        console.error("errror");
      }
    } catch (error) {
      console.error(error)
    }
  }


  const TransactionTypeButtons = () => (
    <div className="flex w-full gap-1 bg-[#F3F4F6] rounded-[20px]">
      {Object.entries(TRANSACTION_TYPES).map(([key, value]) => (
        <Button
          key={value}
          className={cn(
            "w-full px-3 rounded-[20px] transition-all duration-300 ease-in-out text-white",
            {
              "bg-[#0166FF]": transactionType === TRANSACTION_TYPES.EXPENSE && value === TRANSACTION_TYPES.EXPENSE,
              "bg-[#16A34A]": transactionType === TRANSACTION_TYPES.INCOME && value === TRANSACTION_TYPES.INCOME,
              "bg-transparent text-[#1F2937]": transactionType !== value,
            }
          )}
          onClick={() => setTransactionType(value)}
        >
          {key.charAt(0) + key.slice(1).toLowerCase()}
        </Button>
      ))}
    </div>
  );

  return (
    <Dialog className="w-[796px]">
      <DialogTrigger asChild>
        <Button className="bg-[#0166FF] border-none rounded-[20px] flex gap-[5px]">
          <SvgPlus />
          {props.title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md min-w-[796px]" title="Add record">
        <form ref={formRef} onSubmit={handleSubmit}>
          <DialogHeader className="flex flex-row">
            <div className="w-full px-6 py-5 flex flex-col gap-5">
              <TransactionTypeButtons/>
              <div className="space-y-[5px]">
                <p>Amount</p>
                <Input
                  className="bg-[#F3F4F6] py-6 text-[#94A3B8]"
                  name="amount"
                  placeholder="1000.00₮"
                  required
                />
              </div>
              <div className="space-y-[5px]">
                <p>Category</p>
                <Select name="categoryId">
                  <SelectTrigger className="w-full bg-[#F3F4F6] py-6 text-[#94A3B8]">
                    <SelectValue placeholder="Find or choose category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem>
                        <SvgAdd />
                        <p>Add record</p>
                    </SelectItem>
                    {data.map((el,i )=> {
                      return (
                        <SelectItem index={i} key={i} value={el.id}>
                          {el.name}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-[5px]">
                <p>Date</p>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
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
              </div>
              <Button
                className={cn("px-3 rounded-[20px]", {
                  "bg-[#0166FF]": transactionType === "EXP",
                  "bg-[#16A34A]": transactionType === "INC",
                })}
                onClick={handleSubmit}
              >
                Add Record
              </Button>
            </div>
            <div className="w-full px-6 pt-[15px] pb-6 space-y-5">
              <div className="space-y-[5px]">
                <p>Name</p>
                <Input
                  className="bg-[#F3F4F6] text-[#94A3B8] py-6"
                  name="name"
                  placeholder="Write here"
                />
              </div>
              <div className="space-y-[5px]">
                <p>Note</p>
                <Textarea
                  name="description"
                  className="bg-[#F3F4F6] h-full text-[#94A3B8] py-6"
                  placeholder="Write here"
                />
              </div>
            </div>
          </DialogHeader>
        </form>
      </DialogContent>
    </Dialog>
  );
};
