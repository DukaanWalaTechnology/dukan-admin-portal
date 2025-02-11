import React, { useEffect, useState } from 'react'
import ShopCards from '@/components/ShopCards';
import { getRegisteredShops } from '@/apis/api';
import HashLoader from 'react-spinners/HashLoader';
 

const RegisteredShops = () => {
    const [shops, setShops] = useState([]);
    const[isLoading,setIsLoading]=useState(false);
    const fetchAllShops = async () => {
      setIsLoading(true);
        try {
          const shops = await getRegisteredShops();
          setShops(shops.data);
          console.log(shops.data, "registered");
        } catch (error: any) {
          console.error("Error fetching shops:", error.message);
        }
        setIsLoading(false);
      };
    
      useEffect(() => {
        fetchAllShops();
      }, []);
  return (
    <div className="w-full rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
    <div className="p-4">
      {
        isLoading ? (
          <div className="flex justify-center items-center h-screen mt-10">
            <HashLoader color="#4328a4" />
              
          </div>
        ) : (
          <>
          <ShopCards shops={shops} />
          </>
        )
      }

    </div>
  </div>
  
  
  )
}

export default RegisteredShops