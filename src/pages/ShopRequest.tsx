import { useEffect, useState } from "react";
import { getAllShopsStatus } from "@/apis/api";
import ShopCards from "@/components/ShopCards";
import { Skeleton } from "@/components/ui/skeleton";

const ShopRequest = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllPendingShops = async () => {
    try {
      const response = await getAllShopsStatus();
      console.log(response, "Response of all fetched Shops");
      setShops(response.data);
    } catch (error: any) {
      console.log(error.message, "error from fetching jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPendingShops();
  }, []);

  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full">
        {loading ? (
          // Skeleton Loader while fetching
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="p-4 border rounded-xl shadow-md bg-neutral-100 dark:bg-neutral-800"
              >
                <Skeleton className="h-6 w-3/4 mb-2 rounded-xl" />
                <Skeleton className="h-4 w-1/2 mb-4 rounded-xl" />
                <Skeleton className="h-40 w-full mb-2 rounded-xl" />
                <div className="flex justify-between">
                  <Skeleton className="h-6 w-1/4 rounded-xl" />
                  <Skeleton className="h-6 w-1/4 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Show real shop cards once data is loaded
          <ShopCards shops={shops} />
        )}
      </div>
    </div>
  );
};

export default ShopRequest;
