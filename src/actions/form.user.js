'use server'

import {z} from "zod";
import prisma from "@/prisma/client";

const schema = z.object({
    name: z
        .string()
        .trim()
        .min(3, { message: "Name is required and must be at least 3 characters long" })
        .regex(/^[A-Za-z\s]+$/, { message: "Name can only contain letters and spaces" }),


    email: z
        .string()
        .email({ message: "Invalid email format" })
        .regex(/^[A-Za-z][A-Za-z0-9._%+-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, { message: "Email must start with a letter and be in a valid format" }),

});

export const createUser = async (prev,formData)=>{
   const validateField = schema.safeParse({
       name: formData.get("name"),
       email: formData.get("email"),
   });

   if(!validateField.success){
        return{
            error: validateField.error.flatten().fieldErrors,
            success: false,
        }
   }

   const {name,email} = validateField.data;

    try {
        const newUser = await prisma.User.create({
            data: {
                name,
                email,
            },
        });
        return { user: newUser, success: true, error: false };
    } catch (error) {
        return { error: { message: "Failed to create user", success: false } };
    }
}