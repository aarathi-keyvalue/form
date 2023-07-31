import { useRef } from "react";
import { Controller } from "react-hook-form";

import { Avatar, Camera } from "../assets/images";

const ImageFetcher = ({
  name,
  register,
  control,
  setValue,
  image = "",
  setImage = () => {},
  error,
}) => {
  const { ref } = register(name);
  const inputRef = useRef(ref);

  const handleFileUpload = () => {
    inputRef.current?.click();
  };

  const handleInput = (event) => {
    setImage({
      preview: URL.createObjectURL(event.target.files[0]),
      data: event.target.files[0],
    });
    setValue(name, event.target.files[0]);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex flex-col items-center">
          <div
            className="flex items-center justify-center cursor-pointer relative h-20 w-20 sm:h-[120px] sm:w-[120px] border border-cloud bg-white rounded-full"
            onClick={handleFileUpload}
          >
            <img
              className="object-contain rounded-full border-comet h-20 w-20 sm:h-[120px] sm:w-[120px]"
              src={image === "" ? Avatar : image.preview}
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
            onChange={(e) => {
              field.onChange(e);
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
      )}
    />
  );
};

export default ImageFetcher;
