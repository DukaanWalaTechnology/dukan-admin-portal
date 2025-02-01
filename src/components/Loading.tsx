
import { Loader } from "lucide-react";

function Loading() {
  return (
    <div className="flex  justify-center ml-5 h-screen ">
      <Loader className=" w-10 h-10 text-gray-500" />
    </div>
  );
}

export default Loading;
