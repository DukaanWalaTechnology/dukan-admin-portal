
import { Loader } from "lucide-react";
import {RingLoader} from "react-spinners"
function Loading() {
  return (
    <div className="flex justify-center items-center h-full">
      <RingLoader color="#4b119f"  />
    </div>
  );
}

export default Loading;
