"use client";

import { useEffect, useState } from "react";
import { SvgHouse } from "..";
import axios from "axios";

const timeConvertor = (time) => {
  const pastDate = new Date(time);
  const currentTime = Date.now();
  const pastTime = pastDate.getTime();

  if (pastTime > currentTime) {
    return "Future date";
  }

  const difference = (currentTime - pastTime) / 1000;
  const differenceSec = Math.floor(difference % 60);
  const differenceMin = Math.floor(difference / 60) % 60;
  const differenceHour = Math.floor(difference / 3600) % 24;
  const differenceDay = Math.floor(difference / 86400);

  let result = "";

  if (differenceDay > 0) {
    result += `${differenceDay} day${differenceDay > 1 ? "s" : ""}`;
  }

  if (differenceHour > 0) {
    if (result) result += " ";
    result += `${differenceHour} hour${differenceHour > 1 ? "s" : ""}`;
  }

  if (differenceMin > 0) {
    if (result) result += " ";
    result += `${differenceMin} minute${differenceMin > 1 ? "s" : ""}`;
  }

  // if (differenceSec > 0 || result === '') {
  //   if (result) result += ' ';
  //   result += `${differenceSec} second${differenceSec > 1 ? 's' : ''}`;
  // }

  result += " ago";

  return result;
};

export const DashboardRecords = () => {
  const [chartData, setChartData] = useState([]);
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/record/getDesc");
      res.data.map((e) => {
        e.month = new Date(e.month).getTime();
      });
      setChartData(res.data.sort((a, b) => b.month - a.month));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-[#F3F4F6] pb-5 mt-6">
      <div className="max-w-[1200px] m-auto bg-white rounded-xl">
        <p className="text-[#0F172A] font-semibold px-6 py-4">Last Records</p>
        {chartData.map((el, i) => (
          <div key={el + i} className="flex justify-between py-5 border-t mx-6">
            <div className="flex gap-[10px] items-center">
              <div className="bg-[#0166FF] size-10 rounded-full flex items-center justify-center">
                <SvgHouse />
              </div>
              <div>
                <p>{el.desc}</p>
                <p className="text-[#6B7280] text-sm">
                  {timeConvertor(el.month)}
                </p>
              </div>
            </div>
            <p className="text-[#84CC16]">{el.total.toLocaleString() + "₮"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
