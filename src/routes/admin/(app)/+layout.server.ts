import { getUser } from "@entities/user/api/user";
import { redirect } from "@sveltejs/kit";

export async function load({ fetch, cookies }) {
    const accessToken = cookies.get("access_token") || null;
    if (!accessToken) {
        throw redirect(302, "/admin/login")
    }

    let user = undefined
    try{

        user = await getUser(fetch, accessToken)
    }catch{
        throw redirect(302, "/admin/login")
    }



    return { user, accessToken }
}