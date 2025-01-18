import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { approveShopRequest, getAllShopsStatus, getSelectedShopData } from '@/apis/api'
import { Loader } from 'rsuite';
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom';
import { ModalComponent } from '@/components/ModalComponent';
import { ToastAction } from "@/components/ui/toast"
import { useToast } from '@/hooks/use-toast';

const ShopRequest = () => {
  const[shops,setShops]=useState([])
  const { toast } = useToast()
  const navigate=useNavigate()
  const[selectedId,setSeledtedId]=useState(0)
  const[selectedShopData,setSelectedShopData]=useState()
  const [isLoading,setIsLoading]=useState(false)
  const fetchAllPendingShops=async()=>{
   try {
    const response=await getAllShopsStatus();
    console.log(response,'Response of all fetched Shops')
    setShops(response.data)
    
   } catch (error:any) {
    console.log(error.message,"error form fetching jobs")
    
   }
    
  }
  const fetchShopDetails=async(selectedId: any)=>{
    if (!selectedId) return; 
    const response=await getSelectedShopData(selectedId);
    setSelectedShopData(response.data)
    console.log(response.data,'Response of selected shop')
  }
  
  const tableHeadings = [
    {
      label: "ShopName",
      href: "/dashboard",
      // icon: <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    // {
    //   label: "Owner Name",
    //   href: "/home",
    //   // icon: <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    // },
    {
      label: "Shop Address",
      href: "/shop-request",
      // icon: <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Status",
      href: "#",
      // icon: <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Verify-Details",
      href: "#",
      // icon: <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
  ];
  const handleVerifyDetails=(id:any)=>{
    setSeledtedId(id)
  }
  const handleApproveRequest = async (id: number) => {
    setIsLoading(true);
    try {
      const response = await approveShopRequest(id);
      fetchAllPendingShops();
    } catch (error: any) {
      console.error("Error approving shop request:", error?.response?.message);
      toast({
        title: "Uh oh! Something went wrong.",
        description: `${error?.response?.data?.message}`,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }finally{
      setIsLoading(false);
    }
  };
  useEffect(()=>{
    fetchAllPendingShops()
    fetchShopDetails(selectedId)
  },[selectedId])
  return (
    <>
    <div className="flex flex-1">
          <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full ">
          <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  {
                    tableHeadings.map((headings,index)=>(
                      <>
                  
                      <TableHead key={index} className="w-[100px]">{headings.label}</TableHead>
                      </>
                    ))
                  }
                  
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  shops?.length==0?(<>
                  <Loader size="md" content="Medium" />
                  </>):(<>
                    {
                  shops?.map((shop:any,index)=>(
                    <TableRow key={index}>
                      <TableCell>
                        {shop.shopName}
                        </TableCell>
                      <TableCell className='text-ellipsis overflow-hidden'>{shop.address}</TableCell>
                      
                      <TableCell>
                      {shop.status==="APPROVED"?(<>
                        <Button>
                          APPROVED
                          </Button>
                      </>):(<>
                        <Button className='bg-red-500 text-white hover:bg-orange-600'>
                          PENDING
                          </Button>
                      </>)}
                          
                      </TableCell>
                      <TableCell>
                        <button onClick={()=>handleVerifyDetails(shop.id)}>{
                          <>
                                           
      <ModalComponent
       verifybutton="Show Details"
       closebutton="Close"
       title="Verify Shop Details"
       isLoading={isLoading}
       modalcontent={selectedShopData}
       handlefunctions={() => handleApproveRequest(shop.id)}
       />
                          </>
                          }</button>
      
                          
                      
      
                      </TableCell>
                    </TableRow>
                  ))
                }
                  </>)
                }
                
               
              </TableBody>
            </Table>

          </div>
        </div>
    </>
  )
}

export default ShopRequest
