import prisma from "@/prisma/client";

async function fetchUser(){
    const skip=2;
    const limit=4;

    const users = await prisma.User.findMany({
        select:{
            name:true,
            email:true
        },
        skip: skip,    // Skip records for previous pages
        take: limit,   // Limit number of records per page
    });
    const total = await prisma.user.count();

    return {total,users};
}

export const post = async () => {

    const {total,users} = await fetchUser();

    if(users?.length==0){
        return (
            <h2>Data not foundddddddd</h2>
        )
    }
    return (
        <div>

            <h1 className="text-center text-3xl m-3 ">User List</h1>
            <div className="">
                <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 bg m-4">
                    {users.map((user, index) => (
                        <li key={index} className="bg-indigo-500  rounded-2xl p-2">
                            <p>Name: {user.name}</p>
                            <p>Email: {user.email}</p>
                        </li>
                    ))}
                </ul>
            </div>
            
        </div>
    );
};

export default post;