"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

type FormValues = {
  title: string;
  createdAt: string;
  images: FileList;
};

const UploadImage = () => {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const [response, setResponse] = useState<any>(null);

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("createdAt", data.createdAt);

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
          type="datetime-local"
          {...register("createdAt", { required: true })}
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

        {response && (
          <div className="mt-4">
            <p className="font-bold">Uploaded URLs:</p>
            <ul>
              {response.urls.map((url: string, i: number) => (
                <li key={i}>
                  <img src={url} alt={`Uploaded ${i}`} className="w-48 mt-2" />
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};

export default UploadImage;
