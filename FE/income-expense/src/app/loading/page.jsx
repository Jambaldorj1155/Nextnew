import { SvgGeld, SvgLoading } from "@/components/files";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center gap-[48px]">
        <SvgGeld />
        <div className="flex flex-col items-center gap-4">
            <SvgLoading />
            <p>Түр хүлээнэ үү...</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
