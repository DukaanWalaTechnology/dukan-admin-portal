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
import { getAllShopsStatus } from '@/apis/api'
import { Loader } from 'rsuite';
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom';


const ShopRequest = () => {
  const[shops,setShops]=useState([])
  const navigate=useNavigate()
  const fetchAllPendingShops=async()=>{
   try {
    const response=await getAllShopsStatus();
    console.log(response,'Response of all fetched Shops')
    setShops(response.data)
    
   } catch (error:any) {
    console.log(error.message,"error form fetching jobs")


   }
    
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
  const handleVerifyDetails=(id:string)=>{
    navigate(`/shop-request/${id}`)
    
  }
  useEffect(()=>{
    fetchAllPendingShops()
  },[])
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
                        <button onClick={()=>handleVerifyDetails(shop.id)}>Verify</button>
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
