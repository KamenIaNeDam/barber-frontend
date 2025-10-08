import { getGalleryByID } from '@entities/gallery/api/admin-gallery.js';
import { error, redirect } from '@sveltejs/kit';


export async function load({fetch, cookies, params}) {
    const accessToken = cookies.get("access_token") || null;
    if (!accessToken) {
        throw redirect(302, "/admin/login")
    }
    try{
        const gallery = await getGalleryByID(fetch, accessToken, Number(params.id) )
        return {
            gallery
        }
    } catch (err) {
        return error(404, "Gallery not found")

    }
}