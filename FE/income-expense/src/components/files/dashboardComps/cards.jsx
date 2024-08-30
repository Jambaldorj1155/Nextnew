"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SvgChip, SvgLogoBlue, SvgShape, SvgUp } from "..";

export const DashboardCards = ({ chartData }) => {
  let allIncome = 0;
  let allExpense = 0;
  for(let i = 0; i < chartData.length; i++){
    allIncome += chartData[i].income
    allExpense += chartData[i].expense
  }

  return (
    <div className="pt-8 pb-5 bg-[#F3F4F6]">
      <div className="flex gap-6 max-w-[1200px] m-auto">
        <Card className="w-[385px] h-[220px] bg-[#0166FF] text-white relative rounded-2xl">
          <CardHeader className=" absolute top-8 left-8 p-0">
            <CardTitle className="flex items-center gap-1">
              <SvgLogoBlue />
              <p className="text-lg">Geld</p>
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex flex-col items-start absolute bottom-[35px] left-8 p-0">
            <p>Cash</p>
            <p>{(allIncome - allExpense || "0").toLocaleString()}</p>
          </CardFooter>
          <div className="absolute right-0 bottom-0">
            <SvgShape />
          </div>
          <div className="absolute right-8 bottom-[35px]">
            <SvgChip />
          </div>
        </Card>
        <Card className="w-[385px] h-[220px]">
          <CardHeader className="border-b px-6 py-4">
            <CardTitle className="flex items-center gap-2">
              <p className="size-2 bg-[#84CC16] rounded-full"></p>
              <p className="text-base">Your Income</p>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 pt-5 pb-6">
            <div className="flex text-4xl font-semibold gap-1">
              <p>{(chartData[chartData.length-1]?.income || "0").toLocaleString() + "₮"}</p>
            </div>
            <p className="text-[#64748B] text-lg">Your Income Amount</p>
            <div className="flex gap-1 mt-4">
              <SvgUp />
              <p>{(Math.floor((chartData[chartData.length-1]?.income/chartData[chartData.length-2]?.income - 1)*100) || "0") + "% from last month"}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="w-[385px] h-[220px]">
          <CardHeader className="border-b px-6 py-4">
            <CardTitle className="flex items-center gap-2">
              <p className="size-2 bg-[#0166FF] rounded-full"></p>
              <p className="text-base">Total Expenses</p>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 pt-5 pb-6">
            <div className="flex text-4xl font-semibold gap-1">
              <p>{(chartData[chartData.length-1]?.expense || "0").toLocaleString() + "₮"}</p>
            </div>
            <p className="text-[#64748B] text-lg">Your Expense Amount</p>
            <div className="flex gap-1 mt-4">
              <SvgUp />
              <p>{(Math.floor((chartData[chartData.length-1]?.expense/chartData[chartData.length-2]?.expense - 1)*100) || "0") + "% from last month"}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
