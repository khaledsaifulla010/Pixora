"use client";
import React, { useEffect, useState } from "react";

const ImagesList = () => {
  const [images, setImages] = useState<any[]>([]);

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
                    width={350}
                    height={300}
                    className="border p-2 rounded-xl "
                    style={{ width: "350px", height: "350px" }}
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
    </div>
  );
};

export default ImagesList;
