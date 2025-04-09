"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

type FormValues = {
  title: string;
  images: FileList;
};

const UploadImage = () => {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const [response, setResponse] = useState<any>(null);

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("title", data.title);
    for (let i = 0; i < data.images.length; i++) {
      formData.append("images", data.images[i]);
    }

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    setResponse(result);
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          {...register("title", { required: true })}
          placeholder="Image title"
          className="border px-3 py-2 w-full"
        />

        <input
          type="file"
          {...register("images", { required: true })}
          multiple
          accept="image/*"
          className="border px-3 py-2 w-full"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Upload
        </button>

        {response?.data && (
          <div className="mt-4">
            <p className="font-bold">Uploaded:</p>
            <p>Title: {response.data.title}</p>
            <p>Date: {new Date(response.data.createdAt).toLocaleString()}</p>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {response.data.imageUrls.map((url: string, i: number) => (
                <img key={i} src={url} className="w-full rounded" />
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default UploadImage;
