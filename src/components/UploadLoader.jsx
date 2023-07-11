import "../css/animation.css";

export default function UploadLoader() {
  return (
    <div className="mx-auto w-[400px] rounded-xl bg-white px-8 py-9 drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
      <p className="font-poppins pb-8 text-lg/none font-medium">Uploading...</p>
      <div className="overflow-hidden rounded-lg bg-[#f2f2f2]">
        <hr className="animate-upload-loader w-24 rounded-lg border-[3px] border-[#2f80ed] bg-[#2f80ed]" />
      </div>
    </div>
  );
}
