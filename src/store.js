import { configureStore, createSlice } from "@reduxjs/toolkit";

const initState = { status: null, img: null };

const imageReducer = createSlice({
  name: "image",
  initialState: initState,
  reducers: {
    updateStatus: (state, newState) => {
      // loading, failed
      return newState.payload;
    },
    setImage: (state, image) => {
      // state.img = axios
      //   .post("http://localhost:3000/upload/", image.payload)
      //   .then((res) => res.data.message);
      // const res = fetch("http://localhost:3000/upload/", {
      //   method: "POST",
      //   body: image.payload,
      // }).then((res) => res.json());
      state.img = image.payload;
      state.status = "success";
    },
  },
});

export default imageReducer;
export const { updateStatus, setImage } = imageReducer.actions;
export const imageStore = configureStore({
  reducer: {
    image: imageReducer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
