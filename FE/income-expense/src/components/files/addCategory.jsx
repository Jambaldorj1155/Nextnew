"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SvgFoodOrange, SvgPlusBlue } from ".";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useRef, useState } from "react";
import axios from "axios";

const mockData = [
  <SvgFoodOrange />,
  <SvgFoodOrange />,
  <SvgFoodOrange />,
  <SvgFoodOrange />,
  <SvgFoodOrange />,
  <SvgFoodOrange />,
  <SvgFoodOrange />,
  <SvgFoodOrange />,
  <SvgFoodOrange />,
  <SvgFoodOrange />,
  <SvgFoodOrange />,
  <SvgFoodOrange />,
];

export const AddCategory = () => {
  const [msg, setMsg] = useState("")
  const formRef = useRef();

  const onSubmit = async (event) => {
    event.preventDefault();
    const elements = formRef.current;
    const name = elements.name.value;
    let description = name;

    try {
      const response = await axios.post(
        "http://localhost:8000/category/create",
        {
          name,
          description,
        }
      );
      if (response.status === 201) {
        setMsg("successfully added category")
        console.log("successfully added category");
      } else {
        console.error("errror");
      }
    } catch (error) {
      console.error("errror");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-fit bg-white text-black flex gap-2 items-center">
          <SvgPlusBlue />
          <p>Add category</p>
        </Button>
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-[425px] min-w-[494px]"
        title="Add category"
      >
        <form ref={formRef} onSubmit={onSubmit}>
          <DialogHeader className="flex flex-row gap-3 px-6 pt-6 pb-3">
            <Select>
              <SelectTrigger className="w-[84px]"></SelectTrigger>
              <SelectContent>
                <SelectGroup className="flex flex-wrap max-w-[318px] h-[400px]">
                  {mockData.map((el, i) => (
                    <SelectItem className="size-auto">{el}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input name="name" className="w-[350px]" />
          </DialogHeader>

          <DialogFooter className="flex px-6 pb-6 py-3">
            <Button className="w-full" type="submit">
              Save changes
            </Button>
          </DialogFooter>
          {msg}
        </form>
      </DialogContent>
    </Dialog>
  );
};
