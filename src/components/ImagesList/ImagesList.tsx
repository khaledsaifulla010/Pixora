"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  maxWidth: 700,
  bgcolor: "black",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

const ImagesList = () => {
  const [images, setImages] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleOpen = (url: string) => {
    setSelectedImage(url);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch("/api/upload");
      const data = await response.json();

      if (data.success) {
        setImages(data.data);
      } else {
        console.error("Error fetching images", data.error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="px-10 py-6">
      {images.length > 0 ? (
        <div className="space-y-12">
          {images.map((item: any) => (
            <div key={item._id}>
              <h2 className="text-3xl font-bold mb-4">{item.title}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ml-24">
                {item.imageUrls.map((url: string, idx: number) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`${item.title} ${idx + 1}`}
                    className="border p-2 rounded-xl cursor-pointer"
                    style={{ width: "350px", height: "350px" }}
                    onClick={() => handleOpen(url)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="font-bold text-2xl text-center mt-72 text-gray-500">
          Oops! Your Gallery is Empty
        </p>
      )}

      {/* Image Preview Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="image-modal"
        aria-describedby="preview of clicked image"
      >
        <Box sx={style}>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Preview"
              className="rounded-xl"
              style={{
                width: "800px",
                maxHeight: "80vh",
                objectFit: "contain",
              }}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ImagesList;
