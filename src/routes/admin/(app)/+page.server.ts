import { getSeo } from '@entities/seo/api/seo.js';
import { redirect } from '@sveltejs/kit';


export async function load({ fetch,cookies }) {
    const accessToken = cookies.get("access_token") || null;
    if (!accessToken) {
        throw redirect(302, "/admin/login")
    }

    const seo = await getSeo(fetch, accessToken)
    return {
        seo
    }


}