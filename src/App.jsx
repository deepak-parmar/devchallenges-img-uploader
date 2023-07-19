import { useSelector } from "react-redux";
import Home from "./components/Home";
import Success from "./components/Success";
import UploadLoader from "./components/UploadLoader";
import "./css/fonts.css";
import "./css/main.css";

function App() {
  const imageState = useSelector((state) => state.image);

  switch (imageState.status) {
    case "uploading":
      return <UploadLoader />;

    case "success":
      return <Success img={imageState.img} />

    default:
      if (imageState.err) {
        alert(imageState.err);
      }
      return <Home />;
  }
}

export default App;
