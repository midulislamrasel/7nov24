import prisma from "@/prisma/client";

async function fetchUser(){
    const users = await prisma.User.findMany({
        select:{
            name:true,
            email:true
        }
    })
    return users;
}

export default async function Home() {
    const users = await fetchUser()
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
}
