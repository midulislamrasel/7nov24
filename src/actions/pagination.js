import prisma from "@/prisma/client";

export const revalidate = 1;

async function fetchUser(page = 1, pageSize = 10) {
    const skip = (page - 1) * pageSize; // Calculate the offset
    const users = await prisma.user.findMany({
        skip,              // Skip users for pagination
        take: pageSize,    // Limit the number of users per page
        select: {
            name: true,
            email: true,
        },
    });

    const totalUsers = await prisma.user.count(); // Get total number of users
    return { users, totalUsers };
}
