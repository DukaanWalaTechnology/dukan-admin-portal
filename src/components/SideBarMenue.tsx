import  { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { IconArrowLeft, IconBrandTabler, IconSettings, IconUserBolt } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getItemFromLocalStorage, removeItemFromLocalStorage } from "@/helper";
// import { logoutUser } from "@/apis/api";
import { logout } from "@/store/authSlice";
import { useToast } from "@/hooks/use-toast";
import { Store } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function SideBarMenue() {
  const userInfo = useSelector((state: any) => state.auth) || getItemFromLocalStorage("userdata");
  const username = userInfo?.auth?.userData?.name || "User";
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {toast} = useToast()
  if(!userInfo){
    toast({
      title: "Access denied",
      description: "Please Login to access",
    })

  }
  // navigate('/sign-up')
  const handleLogout = () => {
    // await logoutUser()
    dispatch(logout())
    localStorage.removeItem("userdata");
    removeItemFromLocalStorage("token")
    navigate('/sign-up')
    toast({
      title: "LogedOut In Successfully",
      description: "Admin Logout Successfully",
    })
  
  };  
  const links = [
    { 
      label: "Dashboard",
      href: "/",
      icon: <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Profile",
      href: "/home",
      icon: <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Shop Request",
      href: "/shop-request",
      icon: <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Registered shops",
      href: "/registered-shops",
   
      icon:  <Store className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Logout",
      href: "#",
      icon: <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      action:handleLogout
    },
  ];

  const [open, setOpen] = useState(false);

  // Get the current path
  const location = useLocation();

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row w-full h-screen bg-gray-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
      )}
    >
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <Logo />
            <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
  link.label === "Logout" ? (
    <button key={idx} onClick={link.action} className="flex items-center p-2 rounded-md text-sm text-neutral-700 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-600">
      {link.icon}
      <span className="ml-2">{link.label}</span>
    </button>
  ) : (
    <Link key={idx} to={link.href}>
      <SidebarLink
        link={link}
        className={cn(
          "flex items-center p-2 rounded-md text-sm",
          location.pathname === link.href
            ? "bg-gray-200 dark:bg-neutral-700 text-black dark:text-white"
            : "text-neutral-700 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-600"
        )}
      />
    </Link>
  )
))}

            </div>
          </div>
          <div>
  <SidebarLink
    link={{
      label: `${username}`,
      href: "#",
      icon: (
        <Avatar className="border border-gray-300 dark:border-gray-600 rounded-full">
          <AvatarImage src={""} />
          <AvatarFallback>{username ? username.charAt(0).toUpperCase() : "?"}</AvatarFallback>
        </Avatar>
      ),
    }}
  />
</div>

        </SidebarBody>
      </Sidebar>

      {/* Dynamic content */}
      <div className="flex flex-1">
        <Outlet />
      </div>
    </div>
  );
}

// Logo component
export const Logo = () => {
  return (
    <a
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Dukan
      </motion.span>
    </a>
  );
};
