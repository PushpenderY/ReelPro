import axios from "axios";
import api from "@/lib/axios";
import { RegisterUser } from "@/types/auth.types";

export const registerUser = async (data: RegisterUser) =>{
    const response = await api.post(
        "/api/auth/register",
        data
    );
    return response.data
}