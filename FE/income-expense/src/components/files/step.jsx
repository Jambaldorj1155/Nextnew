import { SvgMoney } from ".";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const Step = () => {
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="max-w-[384px]">
        <div className="mt-[141px] flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-4">
            <div className="bg-[#0166FF] w-fit h-fit p-2 rounded-full">
              <SvgMoney />
            </div>
            <p className="text-2xl font-semibold">Select base currency</p>
          </div>
          <Select>
            <SelectTrigger className="bg-[#F3F4F6] py-6">
              <SelectValue placeholder="MNT - Mongolian Tugrik" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tugrik">MNT - Mongolian Tugrik</SelectItem>
              <SelectItem value="dollar">USD - United States Dollar</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-[#475569] text-xs">
            Your base currency should be the one you use most often. All
            transaction in other currencies will be calculated based on this one{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Step;