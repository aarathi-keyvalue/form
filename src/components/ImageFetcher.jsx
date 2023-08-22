/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";

import { Avatar, Camera } from "../assets/images";
import { CloseIcon } from "../assets/icons";
import ImageCropper from "./ImageCropper";
import Modal from "./Modal";

const ImageFetcher = ({
  name,
  register,
  trigger,
  isSubmitted,
  control,
  setValue,
  image = "",
  setImage = () => {},
  error,
}) => {
  const { ref } = register(name);
  const inputRef = useRef(ref);

  const [showModal, setShowModal] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const [finalImage, setFinalImage] = useState("");

  useEffect(() => {
    if (finalImage) {
      urltoFile(finalImage, "profile.png", "image/png").then(function (file) {
        setImage({
          preview: URL.createObjectURL(file),
          data: file,
        });
        setValue(name, file);
        if (isSubmitted) trigger(name);
      });
    }
  }, [finalImage]);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleFileUpload = () => inputRef.current?.click();

  const urltoFile = (url, filename, mimeType) => {
    if (url.startsWith("data:")) {
      var arr = url.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      var file = new File([u8arr], filename, { type: mime || mimeType });
      return Promise.resolve(file);
    }
    return fetch(url)
      .then((res) => res.arrayBuffer())
      .then((buf) => new File([buf], filename, { type: mimeType }));
  };

  const handleInput = (event) => {
    const reader = new FileReader();
    reader.addEventListener("load", () =>
      setImgSrc(reader.result?.toString() || "")
    );
    reader.readAsDataURL(event.target.files[0]);
    setShowModal(true);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div>
          <div className="flex flex-col items-center">
            <div
              className="flex items-center justify-center cursor-pointer relative h-20 w-20 sm:h-[120px] sm:w-[120px] border border-cloud bg-white rounded-full"
              onClick={handleFileUpload}
            >
              <img
                className="object-contain rounded-full border-comet h-20 w-20 sm:h-[120px] sm:w-[120px]"
                src={finalImage === "" ? Avatar : finalImage}
                alt="profile"
                height={120}
                width={120}
              />
              <div className="absolute bottom-0 right-0 flex justify-center rounded-full bg-white p-1 cursor-pointer">
                <img
                  src={Camera}
                  alt="camera"
                  className="rounded-full object-cover"
                  width={20}
                  height={20}
                />
              </div>
            </div>
            <input
              name={name}
              type="file"
              accept=".jpg, .png, .jpeg"
              ref={inputRef}
              className="hidden"
              onClick={(event) => (event.target.value = "")}
              onChange={(e) => {
                handleInput(e);
              }}
            />
            <div>
              {error ? (
                <span className="text-xs text-warningRed">
                  {error?.message.toString()}
                </span>
              ) : (
                image && (
                  <span className="text-xs text-comet">{image.data.name}</span>
                )
              )}
            </div>
          </div>
          {showModal && (
            <Modal>
              <div className="relative bg-white border rounded-md shadow-md w-1/2 h-1/2 p-5">
                <CloseIcon
                  className="absolute top-3 right-3 cursor-pointer"
                  width={30}
                  height={30}
                  onClick={handleModalClose}
                />
                <ImageCropper
                  imgSrc={imgSrc}
                  finalImage={finalImage}
                  setFinalImage={setFinalImage}
                  setShowModal={setShowModal}
                />
              </div>
            </Modal>
          )}
        </div>
      )}
    />
  );
};

export default ImageFetcher;
