import { SvgBalance } from ".";
import { Input } from "../ui/input";

  const Step2 = () => {
    return (
      <div className="flex justify-center items-center flex-col">
        <div className="w-[384px]">
          <div className="mt-[141px] flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-4">
              <div className="bg-[#0166FF] w-fit h-fit p-2 rounded-full">
                <SvgBalance />
              </div>
              <p className="text-2xl font-semibold">Set up your cash Balance</p>
            </div>
            <Input className="" placeholder="Email" />

            <p className="text-[#475569] text-xs">
            How much cash do you have in your wallet?{" "}
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Step2;