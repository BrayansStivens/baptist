import ServiceExplorer from "@/components/ServiceExplorer";
export const dynamic = "force-static";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center ">
        <ServiceExplorer />
      </div>
    </>
  );
}
