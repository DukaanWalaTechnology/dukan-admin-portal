import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { approveShopRequest, getSelectedShopData } from "@/apis/api";
import HashLoader from "react-spinners/HashLoader";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

// Define TypeScript Interface for shop details
interface User {
  name: string;
  email: string;
  role: string;
}

interface ShopData {
  id: number;
  shopName: string;
  address: string;
  tradeName: string;
  gstNumber: string;
  panNumber: string;
  foodLicense: string;
  phone: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  userId: number;
  createdAt: string;
  updatedAt: string;
  user: User;
}

const VerifyShops: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const shopId = id ? parseInt(id, 10) : null;
  const [selectedShopData, setSelectedShopData] = useState<ShopData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const [approving, setIsApproving] = useState(false);

  // Fetch Shop Details
  const fetchShopDetails = async (selectedId: number | null) => {
    if (!selectedId) return;
    try {
      const response = await getSelectedShopData(selectedId);
      setSelectedShopData(response.data);
    } catch (error) {
      console.error("Error fetching shop details:", error);
    } finally {
      setLoading(false);
    }
  };

  // Approve Request
  const handleApproveRequest = async () => {
    if (!shopId) return;
    setIsApproving(true);
    try {
      const response = await approveShopRequest(shopId);
      console.log("Approval response:", response);
      // Update shop data after approval
      fetchShopDetails(shopId);
      toast({
        title: "Shop Approved",
        description: "The shop has been successfully approved.",
      });
    } catch (error: any) {
      console.error("Error approving shop request:", error?.response?.message);
      toast({
        title: "Uh oh! Something went wrong.",
        description: error?.response?.data?.message || "Failed to approve shop.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setIsApproving(false);
    }
  };

  useEffect(() => {
    fetchShopDetails(shopId);
  }, [shopId]);

  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full">
        <div className="flex flex-col items-center p-6">
          {/* Loader */}
          {loading ? (
            <div className="flex justify-center items-center h-screen mt-10">
              <HashLoader color="#4328a4" />
            </div>
          ) : selectedShopData ? (
            <Card className="w-full max-w-3xl">
              <CardHeader>
                <CardTitle>Shop Verification Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Shop Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold">Shop Name:</p>
                    <p>{selectedShopData.shopName}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Trade Name:</p>
                    <p>{selectedShopData.tradeName}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Address:</p>
                    <p>{selectedShopData.address}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Phone:</p>
                    <p>{selectedShopData.phone}</p>
                  </div>
                </div>

                {/* Business Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold">GST Number:</p>
                    <p>{selectedShopData.gstNumber}</p>
                  </div>
                  <div>
                    <p className="font-semibold">PAN Number:</p>
                    <p>{selectedShopData.panNumber}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Food License:</p>
                    <p>{selectedShopData.foodLicense}</p>
                  </div>
                </div>

                {/* Owner Details */}
                <div className="border-t pt-3">
                  <p className="font-semibold">Owner:</p>
                  <p>
                    {selectedShopData.user?.name} ({selectedShopData.user?.email})
                  </p>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-2">
                  <p className="font-semibold">Status:</p>
                  <Badge
                    variant={
                      selectedShopData.status === "APPROVED"
                        ? "default"
                        : selectedShopData.status === "REJECTED"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {selectedShopData.status.toUpperCase()}
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button variant="default" onClick={handleApproveRequest} disabled={approving}>
                    {approving ? "Approving..." : "Approve"}
                  </Button>
                  <Button variant="destructive">Reject</Button>
                  <Button variant="outline">Request More Info</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <p className="text-center text-red-500">Shop details not found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyShops;
