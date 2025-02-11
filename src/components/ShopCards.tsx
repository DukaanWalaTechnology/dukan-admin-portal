
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
interface ShopDetails {
  id: number;
  shopName: string;
  address: string;
  isApproved: boolean;
  rating: number;
  reviews: number;
  tradeName: string;
  monthlyOrders: number;
  gstNumber: string;
  phone?: string;
  status?: string;
}
interface ShopDetailsProps{
  shop: ShopDetails;
}
const ShopCard:React.FC<ShopDetailsProps> = ({ shop }) => {
  const navigation=useNavigate()
    console.log("shopss in chiild",shop)
    console.log(shop.status)
    const handleVerifucation=(id:number)=>{
      navigation(`/shop-request-verification/${id}`)
    }
 
  return (
    <Card className="w-88 shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{shop.shopName || "Unnamed Shop"}</CardTitle>
          {shop.isApproved && <span className="text-blue-500">✔️</span>}
        </div>
        <CardDescription className="text-gray-500">{shop.address || "No Address Provided"}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <div className="text-yellow-500 font-semibold">
            ⭐ {shop.rating || "N/A"} ({shop.reviews || "No Reviews"})
          </div>
          <div className="text-sm text-gray-400">{shop.tradeName || "No Trade Name"}</div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Monthly Orders</p>
            <p className="font-bold">{shop.monthlyOrders || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">GST Number</p>
            <p className="font-bold">{shop.gstNumber || "N/A"}</p>
          </div>
        </div>
        <div className="text-sm text-gray-500 mt-4">
          Contact: {shop.phone || "N/A"}
        </div>
      
        {shop.isApproved === true && (
          <div className="mt-2 text-green-500 font-semibold">Verified</div>
        )}
       {shop.status === "PENDING" && (
        <div className="flex justify-between">
  <div className="mt-2 text-red-500 font-semibold">PENDING</div>
  <Button variant={"destructive"} onClick={()=>handleVerifucation(shop.id)}>Verify Shop</Button>
        </div>
        
        )}
        
         
      </CardContent>
    </Card>
  );
};

const ShopCards = ({ shops }: { shops: ShopDetails[] }) => {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {shops.map((shop) => (
          <div key={shop.id} className="w-full">
            <ShopCard shop={shop} />
          </div>
        ))}
      </div>
    );
  };
  
  export default ShopCards;
  
