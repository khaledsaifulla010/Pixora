"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

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

// Snackbar Alert
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ImagesList = () => {
  const [images, setImages] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImageToDelete, setSelectedImageToDelete] = useState<{
    imageId: string;
    url: string;
  } | null>(null);

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

  const handleDelete = async (imageId: string, url: string) => {
    const response = await fetch(`/api/upload?id=${imageId}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (data.success) {
      setSnackbarMessage("Image deleted successfully!");
      setOpenSnackbar(true);
      setImages((prevImages) =>
        prevImages.map((item) => ({
          ...item,
          imageUrls: item.imageUrls.filter(
            (imageUrl: string) => imageUrl !== url
          ),
        }))
      );
    } else {
      setSnackbarMessage("Error deleting image!");
      setOpenSnackbar(true);
    }

    setOpenDialog(false);
    setSelectedImageToDelete(null);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleDeleteClick = (imageId: string, url: string) => {
    setSelectedImageToDelete({ imageId, url });
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedImageToDelete(null);
  };

  return (
    <div className="px-10 py-6">
      {images.length > 0 ? (
        <div className="space-y-12">
          {images.map((item: any) => (
            <div key={item._id}>
              <h2 className="text-3xl font-bold mb-6">{item.title}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 ml-24">
                {item.imageUrls.map((url: string, idx: number) => (
                  <div key={idx} className="relative">
                    <img
                      src={url}
                      alt={`${item.title} ${idx + 1}`}
                      className="border p-2 rounded-xl cursor-pointer"
                      style={{ width: "300px", height: "300px" }}
                      onClick={() => handleOpen(url)}
                    />
                    <DeleteForeverIcon
                      className="absolute -top-4 left-[280px] text-white cursor-pointer"
                      style={{ fontSize: "40px", color: "red" }}
                      onClick={() => handleDeleteClick(item._id, url)}
                    />
                  </div>
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

      {/* Snackbar for Deletion Feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarMessage.includes("Error") ? "error" : "success"}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this image?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (selectedImageToDelete) {
                handleDelete(
                  selectedImageToDelete.imageId,
                  selectedImageToDelete.url
                );
              }
            }}
            color="secondary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ImagesList;
