import { useRef } from "react";
import { useDispatch } from "react-redux";
import { updateStatus } from "../store";
import postImage from "../upload";
import ImageDropZone from "./ImageDropZone";

export default function Home() {
  const imgRef = useRef(null);
  const dispatch = useDispatch();

  const handleChange = async (e) => {
    e.preventDefault();
    dispatch(updateStatus({ status: "uploading" }));
    await postImage(e.target.files[0], dispatch);
  };

  return (
    <section className="z-10 mx-auto flex flex-col items-center justify-center rounded-xl bg-white p-8 drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
      <h1 className="font-poppins pb-4 text-lg/none font-medium tracking-[-.035em] text-[#4f4f4f]">
        Upload your image
      </h1>

      <h2 className="font-poppins pb-7 text-[10px] font-medium tracking-[-.035em] text-[#828282]">
        File should be JPEG, PNG, ...
      </h2>

      <ImageDropZone />

      <input
        ref={imgRef}
        onChange={handleChange}
        type="file"
        name="image"
        id="img-input"
        className="hidden"
        accept="image/*"
      />

      <p className="py-5 text-sm tracking-[-.035em] text-[#bdbdbd]">or</p>

      <button
        className="font-noto-sans rounded-lg border border-dashed border-transparent bg-[#2f80ed] px-4 py-2 text-xs font-medium tracking-[-.035em] text-white hover:border-white focus:border-white"
        onClick={() => imgRef.current.click()}
      >
        Choose a file
      </button>
    </section>
  );
}
