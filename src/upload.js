import axios from "axios";
import { setImage, updateStatus } from "./store";

/**
 * Upload image and update status with URL to uploaded image
 * or failure message
 * @param {File} file
 * @param {function} dispatch
 */
export default async function postImage(file, dispatch) {
  // If file type is not image
  if (!file.type.includes("image")) {
    dispatch(
      updateStatus({
        status: "failed",
        err: "Uploaded file must be an image.",
      })
    );
    return;
  }

  const reqBody = new FormData();
  reqBody.set("image", file);

  setTimeout(async () => {
    axios
      .post("/upload/", reqBody)
      .then((res) => {
        dispatch(setImage(res.data));
      })
      .catch((err) => {
        const errorMsg = Object.prototype.hasOwnProperty.call(err, "response")
          ? // Server-side error
            err.response.data
          : // Client-side error
            err.message;

        dispatch(
          updateStatus({
            status: "failed",
            err: errorMsg,
          })
        );
      });
  }, 1000);
}
