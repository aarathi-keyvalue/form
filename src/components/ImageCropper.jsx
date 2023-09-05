/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import { canvasPreview } from "../utils/canvasPreview";
import Button from "./Button";

const ImageCropper = (props) => {
  const { imgSrc, aspect, setShowModal, handleCropClick } = props;

  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();

  const onCropClick = () => {
    if (!previewCanvasRef.current) {
      throw new Error("Crop canvas does not exist");
    }

    previewCanvasRef.current.toBlob((blob) => {
      if (!blob) {
        throw new Error("Failed to create blob");
      }
      const file = new File([blob], "profile.png", { type: "image/png" });
      handleCropClick(file);
    });
    setShowModal(false);
  };

  const drawToCanvas = async () => {
    if (
      completedCrop?.width &&
      completedCrop?.height &&
      imgRef.current &&
      previewCanvasRef.current
    ) {
      await canvasPreview(
        imgRef.current,
        previewCanvasRef.current,
        completedCrop
      );
    }
  };

  useEffect(() => {
    drawToCanvas();
  }, [completedCrop]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full gap-y-8">
      {!!imgSrc && (
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={aspect}
          ruleOfThirds
        >
          <img
            ref={imgRef}
            alt="Crop me"
            src={imgSrc}
            width={200}
            height={200}
          />
        </ReactCrop>
      )}
      {!!completedCrop && (
        <div className="hidden">
          <canvas
            ref={previewCanvasRef}
            style={{
              objectFit: "contain",
              width: 200,
              height: 200,
            }}
          />
        </div>
      )}

      <Button
        label="Crop"
        buttonStyles="bg-primaryColor text-white"
        onClick={onCropClick}
      />
    </div>
  );
};

export default ImageCropper;
