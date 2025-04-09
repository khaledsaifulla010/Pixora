"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
type FormValues = {
  title: string;
  images: FileList;
};

const UploadImage = () => {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("title", data.title);

    Array.from(data.images).forEach((file) => {
      formData.append("images", file);
    });

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (res.ok) {
        setSnackbarSeverity("success");
        setSnackbarMessage("Images uploaded successfully!");
        setUploadedImages(result.data.imageUrls);
        reset();
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage(result?.error || "Upload failed.");
      }
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Something went wrong!");
    } finally {
      setSnackbarOpen(true);
    }
  };

  return (
    <div className="max-w-xl h-[200px] mx-auto space-y-8 p-4 border rounded-xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <input
          type="text"
          {...register("title", { required: true })}
          placeholder="Enter Image Title"
          className=" px-3 py-2 w-full rounded-xl text-white placeholder-white bg-gray-800"
        />

        <input
          type="file"
          {...register("images", { required: true })}
          accept="image/*"
          multiple
          className=" px-3 py-2 w-full cursor-pointer rounded-xl text-white placeholder-white bg-gray-800"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 font-bold text-white px-4 py-2 rounded cursor-pointer w-full"
        >
          Upload <CloudUploadIcon />
        </button>
      </form>
      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UploadImage;
