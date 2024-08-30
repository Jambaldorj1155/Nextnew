"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SvgEye, SvgNext, SvgPlus, SvgPlusBlue } from "..";
import { Checkbox } from "@/components/ui/checkbox";
import { AddButton } from "../addButton";
import axios from "axios";
import { useState } from "react";
import { AddCategory } from "../addCategory";

const checkboxData = ["All", "Income", "Expense"];
const categoryData = [
  "Food & Drinks",
  "Shopping",
  "Housing",
  "Transportation",
  "Vehicle",
  "Life & Entertainment",
  "Communication, PC",
  "Financial expenses",
  "Investments",
  "Income",
  "Others",
];

export const DetailAddRecord = () => {
  return (
    <div className="min-w-[282px] flex flex-col gap-6 py-6 px-4 bg-white rounded-xl">
      <div className="flex flex-col gap-6">
        <p>Records</p>
          <AddButton title={`Add`} />
      </div>
      <Input placeholder="Search" className="bg-[#F3F4F6] rounded-lg p-4" />
      <div>
        <p className="mb-4 font-semibold">Types</p>
        {checkboxData.map((el, i) => (
          <div key={el + i} className="flex items-center gap-2 py-1 px-3">
            <Checkbox className="rounded-full border-"/>
            <p>{el}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <p className="font-semibold">Category</p>
          <p className="text-[#1F293720]">Clear</p>
        </div>
        <div className="flex flex-col gap-2">
          {categoryData.map((el, i) => (
            <div key={el + i} className="flex justify-between items-center">
              <div className="flex items-center px-3 gap-2 py-1">
                <SvgEye />
                <p>{el}</p>
              </div>
              <SvgNext />
            </div>
          ))}
          <AddCategory/>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-semibold">Amount Range</p>
          <div className="flex gap-4">
            <p className="min-w-[112.5px] p-4 bg-[#F3F4F6] rounded-xl">0</p>
            <p className="min-w-[112.5px] p-4 bg-[#F3F4F6] rounded-xl">1000</p>
          </div>
        </div>
        <div className="flex justify-between relative">
          <div className="flex flex-col items-center gap-1 z-10">
            <div className="bg-[#0166FF] rounded-full p-1 w-fit">
              <p className="size-3 bg-white rounded-full"></p>
            </div>
            <p>0</p>
          </div>
          <p className="w-[237px] h-[4px] absolute top-2 bg-[#0166FF]"></p>
          <div className="flex flex-col items-center gap-1 z-10">
            <div className="bg-[#0166FF] rounded-full p-1 w-fit">
              <p className="size-3 bg-white rounded-full"></p>
            </div>
            <p>1000</p>
          </div>
        </div>
      </div>
    </div>
  );
};
