import PropTypes from "prop-types";
import { useState } from "react";

export default function Success(props) {
  const [linkCopyAlert, setLinkCopyAlert] = useState({ style: "hidden" });
  const { publicUrl, fileName } = props.img;
  const shortUrl = `${window.location.host}/view/${fileName}`;

  return (
    <section className="z-10 mx-auto flex flex-col items-center justify-center rounded-xl bg-white p-8 drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
      <img
        className="mb-3 rounded-full bg-[#219653] p-0.5"
        src="/check.svg"
        width={38}
        height={38}
        alt=""
      />

      <h1 className="font-poppins text-lg/none font-medium tracking-[-.035em] text-[#4f4f4f]">
        Uploaded successfully!
      </h1>

      <img
        className="my-6 w-[340px] rounded-xl"
        src={publicUrl}
        alt={fileName}
      />

      <div className="flex items-center whitespace-nowrap rounded-lg border border-[#e0e0e0] bg-[#f6f8fb] p-0.5">
        <div className="font-poppins w-60 overflow-hidden text-ellipsis pl-1.5 text-xs font-medium text-[#4f4f4f]">
          {shortUrl}
        </div>
        <button
          className="font-noto-sans rounded-lg border border-dashed border-transparent bg-[#2f80ed] px-5 py-2 text-sm font-medium tracking-[-.035em] text-white hover:border-white focus:border-white"
          onClick={() => {
            navigator.clipboard.writeText(shortUrl).then(
              () =>
                setLinkCopyAlert({
                  style: "text-green-700",
                  text: "Link copied to clipboard.",
                }),
              () =>
                setLinkCopyAlert({
                  style: "text-red-700",
                  text: "Could not copy the link! Try again.",
                })
            );
          }}
        >
          Copy Link
        </button>
      </div>
      <p
        className={
          "font-poppins py-1.5 text-center text-sm " + linkCopyAlert.style
        }
      >
        {linkCopyAlert.text}
      </p>
    </section>
  );
}

Success.propTypes = {
  img: PropTypes.object.isRequired,
};
