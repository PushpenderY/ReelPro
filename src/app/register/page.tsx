"use client";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import {useForm} from "react-hook-form"
import { Input } from "@base-ui/react/input";
import { Label } from "@/components/ui/label";
import { Button } from "@base-ui/react/button";
import axios from "axios"
import { useState } from "react";
import {zodResolver} from '@hookform/resolvers/zod'
import { registerSchema } from "@/schemas/userSchema";
import Link from "next/link"
import {Eye, EyeOff, UserPlus} from "lucide-react";
import { registerUser } from "@/services/auth.service";
import { toast } from "sonner"


type RegisterFormData ={
    name: string;
    email:string;
    password: string;
};


export default function RegisterPage(){
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const form = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),

        defaultValues:{
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async(data: RegisterFormData)=>{
        try{
            setLoading(true);
            const response = await registerUser(data);
            toast.success(response.message);
        }
        catch(error){
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    };
    return (
        <main className="min-h-screen flex item-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-2 text-center">
                <div className="flex justify-center">
    <div className="bg-black text-white p-3 rounded-full">
      <UserPlus size={24} />
    </div>
  </div>

  <CardTitle className="text-3xl font-bold">
    ReelPro
  </CardTitle>

  <p className="text-muted-foreground">
    Create your account to continue
  </p>
                    
                </CardHeader>
                <CardContent>
                    <form>
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input 
                        id="name"
                        type="text"
                        placeholder="Enter your name" {...form.register("name")}/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                        id="email"
                        type="email"
                        placeholder="Enter your email"{...form.register("email")}></Input>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative"> 
                        <Input 
                        id="password"
                        type="password"
                        placeholder="Enter your password"{...form.register("password")}></Input>
                    
                    <button
                    type="button"
                    onClick={()=> setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2">
                        {showPassword ? (
                            <EyeOff size={18}/>
                        ):(
                            <Eye size={18}/>
                        )
                    }
                    </button>
                    </div>
                    {form.formState.errors.password && (
                        <p className="text-sm text-red-500">
                            {form.formState.errors.password.message}
                        </p>
                    )}
                    </div>


                    <Button className="w-full"
                    type="submit"
                    disabled={loading}
                    >
                        {loading ? "Creating....": "Create Account"}
                    </Button>
                    <div className="text-center text-sm">
                        Already have an Account?{" "}
                        <Link href="/Login" 
                        className="font-semibold text-blue-600 hover:underline">
                        Login
                        </Link>
                    </div>
                    </form>
                </CardContent>
            </Card>            
        </main>
    )
}