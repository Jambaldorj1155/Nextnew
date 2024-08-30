"use client";

import { SvgGeld } from '@/components/files';
import Step from '@/components/files/step';
import Step2 from '@/components/files/step2';
import Step3 from '@/components/files/step3';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';

const stepper = ["", "", ""];
const buttonTitle = ["Confirm", "Confirm", "Go to Dashboard"];
const styles = {
    primary: `bg-[#0166FF] absolute w-[100px] h-[4px] top-[10px] left-[40px]`,
    secondary: `bg-[#E5E7EB] absolute w-[100px] h-[4px] top-[10px] left-[40px]`, 
}

const numberStyles = {
  primary: `bg-[#0166FF] text-white rounded-full size-6 flex justify-center items-center text-sm z-10`,
  secondary: `bg-[#E5E7EB] text-black rounded-full size-6 flex justify-center items-center text-sm z-10` 
}

const mockData = [
  {
    number: "1",
    title: "Currency"
  },
  {
    number: "2",
    title: "Balance"
  },  
  {
    number: "3",
    title: "Finish"
  }
]

const onBoarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleClick = () => currentIndex < 2 ? setCurrentIndex(currentIndex + 1) : setCurrentIndex(0);
  return (
    <main className="flex flex-col items-center mt-10">
      <div className="max-w-[384px]">
        <div>
          {stepper.map((el, i) => (
            <div key={el + i}>{el}</div>
          ))}
        </div>
        <div className="flex items-center flex-col gap-12">
          <SvgGeld />
          <div className='flex gap-12'>
            {mockData.map((el,i) => (
              <div className='flex flex-col gap-1 items-center relative'>
                <p key={i} className={i <= currentIndex ? numberStyles.primary : numberStyles.secondary}>{el.number}</p>
                <p>{el.title}</p>
                <p key={i} className={i === 2 ? `hidden` : currentIndex > i ? styles.primary : styles.secondary}></p>
              </div>
            ))}
          </div>
        </div>
        {currentIndex === 0 && <Step />}
        {currentIndex === 1 && <Step2 />}
        {currentIndex === 2 && <Step3 />}
        <Link href={currentIndex === 2 ? "/dashboard" : ""}>
        <Button onClick={handleClick} className="mt-8 w-full bg-[#0166FF] rounded-3xl text-white hover:text-black hover:bg-orange-500">{buttonTitle[currentIndex]}</Button>
        </Link>
      </div>
    </main>
  );
};

export default onBoarding;
