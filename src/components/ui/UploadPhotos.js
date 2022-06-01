import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Typography from "@mui/material/Typography";

const Input = styled("input")({
  display: "none",
});

const UploadPhotos = ({
  openUploadPhotos,
  setOpenUploadPhotos,
  images,
  setImages,
  handleUploadImage,
}) => {
  function uploadSingleFile(e) {
    let ImagesArray = Object.entries(e.target.files).map((e) =>
      URL.createObjectURL(e[1])
    );
    console.log(ImagesArray);
    setImages([...images, ...ImagesArray]);
    console.log("images", images);
  }

  function upload(e) {
    e.preventDefault();
    console.log(images);
  }

  function deleteFile(e) {
    const s = images.filter((item, index) => index !== e);
    setImages(s);
    console.log(s);
  }

  const handleClose = () => {
    //setLoading(true);
    setOpenUploadPhotos(false);
  };

  return (
    <Dialog open={openUploadPhotos} onClose={handleClose} maxWidth="xl">
      <DialogTitle>Carga las fotos de la Cancha</DialogTitle>
      <DialogContent>
        <form>
          {/* <div className="form-group preview">
            {images.length > 0 &&
              images.map((item, index) => {
                return (
                  <div key={item}>
                    <img src={item} alt="" />
                    <button type="button" onClick={() => deleteFile(index)}>
                      delete
                    </button>
                  </div>
                );
              })}
          </div> */}
          <Typography variant="h6" component="h6">
            Imagenes Seleccionadas
          </Typography>
          <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
            {images.length > 0 ? (
              images.map((item) => (
                <ImageListItem key={item}>
                  <img
                    width={248}
                    src={`${item}`}
                    srcSet={`${item}`}
                    alt={item.title}
                    loading="lazy"
                  />
                  <ImageListItemBar
                    title={item.title}
                    subtitle={item.author}
                    actionIcon={
                      <IconButton
                        sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                        aria-label={`info about ${item.title}`}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  />
                </ImageListItem>
              ))
            ) : (
              <CloudUploadIcon />
            )}
          </ImageList>
          {images.length > 0 ? (
            <Stack direction="row" alignItems="center" spacing={2}>
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={(e) => {
                    handleUploadImage(e);
                  }}
                />
                <Button
                  variant="contained"
                  component="span"
                  endIcon={<CloudUploadIcon />}
                >
                  Cargar Mas Imagenes
                </Button>
              </label>
              <label htmlFor="icon-button-file">
                <Button
                  variant="contained"
                  endIcon={<CloudDoneIcon />}
                  onClick={() => {
                    setOpenUploadPhotos(false);
                  }}
                >
                  Aceptar
                </Button>
              </label>
            </Stack>
          ) : (
            <div>hola</div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadPhotos;