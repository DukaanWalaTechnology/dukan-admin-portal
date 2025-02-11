import axiosInstance from "./axiosInterceptor";

export const loginUser = async (data: any) => {
  const url = "/api/user/sign-in"; 
  try {
    const response = await axiosInstance.post(url, data);
    return response.data; 
  } catch (error: any) {
    console.error("Login User API Error:", error.response || error.message);
    throw error;
  }
};
export const logoutUser = async () => {
  const url = "/api/user/logout";
  try {
    await axiosInstance.post(url);
  } catch (error: any) {
    console.error("Logout User API Error:", error.response || error.message);
  }

}
export const getAllShopsStatus=async()=>{
  const url=`/api/admin/shop-request`
  try {
    const response=await axiosInstance.get(url);
    return response.data;
  } catch (error: any) {
    console.error("Login User API Error:", error.response || error.message);
    throw error;
    
  }

}

export const getSelectedShopData=async(id:any)=>{
  const url=`/api/admin/shop-data/${id}`
  try {
    const response=await axiosInstance.get(url);
    return response.data;
  } catch (error: any) {
    console.error(" Error in fething shops:", error.response || error.message);
    throw error;
    
  }

}
export const approveShopRequest=async(id:any)=>{
  const url=`/api/admin/shop-request/${id}/approve`
  try {
    const response=await axiosInstance.patch(url);
    return response.data;
  } catch (error: any) {
    console.error(" Error in updating shops:", error.response || error.message);
    throw error;
    
  }
}

export const getRegisteredShops=async()=>{
  const url=`/api/admin/registered`
  try {
    const response=await axiosInstance.get(url);
    return response.data;
  } catch (error: any) {
    console.error("Error in fething shops:", error.response || error.message);
    throw error;
    
  }
}