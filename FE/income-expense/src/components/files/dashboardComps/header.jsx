import { Button } from "@/components/ui/button";
import { SvgLogo, SvgPlus } from "..";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { AddButton } from "../addButton";
import { Check } from "lucide-react";

const styles = {
  first: "font-semibold",
  second: "",
};

export const DashboardHeader = ({ isSemiBold = true }) => {
  return (
    <div className="bg-white">
      <div className="flex justify-between items-center max-w-[1200px] m-auto py-4">
        <div className="flex gap-6 items-center">
          <SvgLogo />
          <Link href="/dashboard" className={isSemiBold ? "font-semibold" : ""}>
            Dashboard
          </Link>
          <Link href="/records" className={isSemiBold ? "" : "font-semibold"}>
            Records
          </Link>
        </div>
        <div className="flex gap-6 items-center">
        <AddButton title="Record"/>
          <Avatar>
            <AvatarImage alt="CN" src="https://s3-alpha-sig.figma.com/img/4b8f/8a06/87e8569e17a69979cf08dac0f798bd37?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QZF30t4~pUaQfSKXlbq9jIMgOZ9gwkonq~~fJF5zqQfci7NvGfR-N-Wp0yrg0De31zjNw3UIMakjrgfgbgkzvtOov8n1aHwTZM6SwFflRlqGI7SGTIrtCIM3S4r0P-yYNzJ7YF8Lg-Tgp40BGkWEo4R7DjHl1JONRrH2sI7mpJ3fxCciyKZ462ACMxwvE9pZM3RBHdY-ni6DufRGTmf3FFTqYnbNh73UQ5cuspIbXvTbulNDDohij2o9JtGbIUx9XFnssfwNbVqDsWez5lXKZi1vatw0~rIBW~Laei3rBjdxlYsLp56lzkfe9Pqu9dD0K4g8RRo0tDXyfCWbevbiwA__" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};
