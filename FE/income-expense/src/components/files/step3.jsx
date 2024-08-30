import { SvgBalance, SvgDone, SvgGeld, SvgMoney } from ".";

const Step3 = () => {
  return (
    <div className="flex justify-center items-center flex-col mt-10">
      <div className="w-[384px]">
        <div className="mt-[141px] flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-4">
            <div className="bg-[#0166FF] w-fit h-fit p-2 rounded-full">
              <SvgDone />
            </div>
            <p className="text-2xl font-semibold">Good Job!</p>
          </div>
          <p className="text-[#475569] text-xs text-center">
          Your very first account has been created. Now continue to dashboard and start tracking{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Step3;