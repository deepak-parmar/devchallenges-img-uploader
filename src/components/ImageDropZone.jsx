import { useDispatch } from "react-redux";
import { updateStatus } from "../store";
import postImage from "../upload";

export default function ImageDropZone() {
  const dispatch = useDispatch();

  const handleDrop = async (e) => {
    e.preventDefault();
    dispatch(updateStatus({ status: "loading" }));
    await postImage(e.dataTransfer.files[0], dispatch);
  };

  return (
    <div
      id="img-drop-zone"
      className="flex aspect-video h-52 w-80 flex-col items-center justify-center gap-8 rounded-xl border border-dashed border-[#97bef4] bg-[#f6f8fb] p-9"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <img src="/image.svg" width={115} height={90} draggable={false} alt="" />
      <p className="font-poppins text-xs font-medium tracking-[-.035em] text-[#bdbdbd]">
        Drag & Drop your image here
      </p>
    </div>
  );
}
