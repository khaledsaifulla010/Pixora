import UploadImage from "@/components/UploadImage/UploadImage";

export default function Home() {
  return (
    <div>
      <h1 className="text-5xl mt-36 text-center font-lora font-bold">Pixora</h1>

      <div className="mt-24 mb-36 max-w-[500px] mx-auto">
        <UploadImage />
      </div>
    </div>
  );
}
