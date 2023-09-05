import { useRef, useState } from "react";

import { CloseIcon, FormIcon } from "../assets/icons";
import { COLORS } from "../constants/colors";
import Modal from "./Modal";
import ImageCropper from "./ImageCropper";

const FileUploader = (props) => {
  const { text, name, setValue, isSubmitted, trigger, error, watch } = props;

  const [imgSrc, setImgSrc] = useState("");
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef();

  const onFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleInput = (event) => {
    const reader = new FileReader();
    reader.addEventListener("load", () =>
      setImgSrc(reader.result?.toString() || "")
    );
    reader.readAsDataURL(event.target.files[0]);
    setShowModal(true);
  };

  const handleCropClick = (file) => {
    setValue(name, file);
    if (isSubmitted) trigger(name);
  };

  const handleModalClose = () => setShowModal(false);

  const clearImage = () => {
    setValue(name, null);
    if (isSubmitted) trigger(name);
  };

  return (
    <div className="relative">
      <div className="text-sm text-cloud mb-2">{text}</div>
      {watch(name) ? (
        <div className="relative w-20 h-20 border-4 rounded-md">
          <div
            className="absolute -top-4 -right-3 border-4 rounded-full w-fit h-fit cursor-pointer"
            onClick={clearImage}
          >
            <CloseIcon height={30} width={30} />
          </div>
          <img
            src={URL.createObjectURL(watch(name))}
            alt="preview"
            className="object-contain w-full h-full rounded-md"
          />
        </div>
      ) : (
        <div className="border border-dashed px-5 py-4 flex gap-x-4 items-center rounded">
          <input
            type="file"
            name={name}
            accept=".jpg, .png, .jpeg, .svg, .gif"
            className="hidden"
            ref={fileInputRef}
            onChange={handleInput}
          />
          <FormIcon fill={COLORS.PRIMARY_COLOR} width={24} height={24} />
          <div>
            <div className="text-sm mb-2">
              <span
                className="text-primaryColor border-b border-dashed border-primaryColor cursor-pointer"
                onClick={onFileUploadClick}
              >
                Click to upload
              </span>{" "}
              or drag and drop
            </div>
            <div className="text-sm text-cloud">
              SVG, JPG, PNG or GIF (max. 3MB)
            </div>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute text-xs text-warningRed left-2 -bottom-5">
          {error.message}
        </div>
      )}
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
              setShowModal={setShowModal}
              handleCropClick={handleCropClick}
              aspect={16 / 9}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default FileUploader;
