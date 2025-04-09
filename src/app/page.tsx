import BasicModal from "@/components/BasicModal/BasicModal";
import ImagesList from "@/components/ImagesList/ImagesList";
import Divider from "@mui/material/Divider";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="ml-[1400px] mt-8">
        <BasicModal />
      </div>
      <Divider sx={{ borderColor: "gray", marginTop: 2 }} />

      <div className="mt-12">
        <ImagesList />
      </div>
    </div>
  );
}
