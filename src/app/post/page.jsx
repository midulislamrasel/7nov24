import prisma from "@/prisma/client";
import Link from "next/link";

// Fetch users based on skip and limit
async function fetchUser(skip, limit) {
    const users = await prisma.User.findMany({
        select: {
            name: true,
            email: true,
        },
        skip: skip,
        take: limit,
    });
    const docs = await prisma.User.count();
    const total = Math.ceil(docs / limit);
    return { total, users };
}

export default async function UserList({ searchParams }) {
    const { skip, limit } = await searchParams;

    const { total, users } = await fetchUser(
        parseInt(skip) || 0,
        parseInt(limit) || 5
    );
    const pages = Array.from({ length: total }, (_, i) => i + 1);

    if (users?.length === 0) {
        return <h2>Data not found</h2>;
    }

    return (
        <div className="px-4">
            <h1 className="text-center text-3xl m-3">User List</h1>
            <div className="container mx-auto flex">
                <input
                    className="w-full h-3 p-4 rounded-md mr-4 text-sky-500 font-medium"
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search your Uesr"
                />
                <button className="btn bg-sky-500 px-6 text-2xl rounded-md">
                    Search
                </button>
            </div>
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 bg m-4">
                {users.map((user, index) => (
                    <li key={index} className="bg-indigo-500 rounded-2xl p-2">
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                    </li>
                ))}
            </ul>

            <div className="flex justify-center space-x-2 mt-4">
                {skip > 0 && (
                    <Link
                        href={`/post/?skip=${
                            parseInt(skip) - 1
                        }&limit=${limit}`}
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        Previous
                    </Link>
                )}

                {pages.map((page) => (
                    <Link
                        key={page}
                        href={`/post/?skip=${page}&limit=${limit}`}
                        className={`px-4 py-2 rounded ${
                            skip === page
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-black"
                        }`}
                    >
                        {page}
                    </Link>
                ))}

                {skip < total && (
                    <Link
                        href={`/post/?skip=${
                            parseInt(skip) + 1
                        }&limit=${limit}`}
                        className="px-4 py-2 bg-green-600 text-white rounded"
                    >
                        Next
                    </Link>
                )}
            </div>
        </div>
    );
}
