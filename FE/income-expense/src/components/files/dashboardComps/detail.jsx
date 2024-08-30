import { DashboardCards } from "./cards";
import { DashboardDays } from "./days";
import { DetailAddRecord } from "./detailAddRecord";


export const DashboardDetail = () => {
  return (
    <div className="bg-[#F3F4F6]">
      <div className="max-w-[1200px] m-auto py-6 flex gap-6">
        <DetailAddRecord/>
        <DashboardDays/>
      </div>
    </div>
  );
};
