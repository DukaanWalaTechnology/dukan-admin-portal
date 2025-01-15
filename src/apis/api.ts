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
