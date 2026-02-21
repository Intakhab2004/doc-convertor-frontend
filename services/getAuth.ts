import { cookies } from "next/headers";


export async function getAuthentication(){
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/refresh-token`,
        {
            method: "POST",
            headers: {
                Cookie: `refreshToken=${refreshToken}`,
            },
            credentials: "include",
        }
    );

    const data = await res.json();
    return data.success;
}