'use client';

import {useActionState} from "react";


import {createUser} from "@/actions/form.user";
import {redirect} from "next/navigation";
import page from "@/app/post/page";


export default function User(){

    const form={
        name:"",
        email:""
    }

    const [state,from_Hands,isPending] = useActionState(createUser,{
        error:false,
        success:false
    })


 console.log(state)
    return (
        <div className="text-3">
                <>
                    <form

                         action={from_Hands}
                        className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"

                    >
                        <h2 className="text-2xl font-semibold mb-4 text-center text-indigo-600">Login</h2>
                        { state.success ?
                            <h1 className="text-2xl text-emerald-400 text-center ">Addition was successful !</h1> : null
                        }
                        <div className="mb-4">
                            <label className="block text-gray-700">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="w-full text-black -500 p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                placeholder="Your Name"
                            />

                            { state.errors?.name && <p className="text-indigo-600">{`${state.errors.name}`}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full p-2 mt-2 text-black -500 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                placeholder="Your Email"
                            />
                            {state.errors?.email && <p className="text-black">{`${state.errors.email}`}</p>}
                        </div>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                        >
                            {`${isPending? "Loading":"Submit"}`}
                        </button>
                    </form>
                </>

        </div>
    )
}