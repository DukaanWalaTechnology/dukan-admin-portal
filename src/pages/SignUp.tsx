import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider } from "react-hook-form";
import { LoaderCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { loginUser } from "@/apis/api";
import { useNavigate } from "react-router-dom";
import { setItemInLocalstorage } from "@/helper";
import { useDispatch } from 'react-redux';
import {login} from "@/store/authSlice"
const SignUp = () => {
  const { toast } = useToast()
  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch=useDispatch()

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      console.log("Form Submitted:", data);
      const response = await loginUser(data);
      console.log(response,"responseee");
      setItemInLocalstorage("userdata",response);
      
      dispatch(login(response))
      navigate("/home");
      toast({
        title: "Loged In Successfully",
        description: "Access The Admin Portal To Liverage the Shops ",
      })
      setIsSubmitting(false); 
    } catch (error:any) {
      console.error("Login error:", error.response);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request."
      })
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6")}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
             
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(handleSubmit)}>
                  <FormField
                    control={methods.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={methods.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full mt-4 flex justify-center items-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <LoaderCircle className="animate-spin w-5 h-5" />
                    ) : (
                      "Login"
                    )}
                  </Button>
                </form>
              </FormProvider>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
