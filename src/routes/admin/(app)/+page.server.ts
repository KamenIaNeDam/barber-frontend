import { getContacts } from '@entities/contact/api/admin-contact';
import { getLocation } from '@entities/location/api/admin-location.js';
import { getSeo } from '@entities/seo/api/seo.js';
import { getServices } from '@entities/service/api/admin-service.js';
import { getSocialMedias } from '@entities/social-media/api/admin-social-media.js';
import { redirect } from '@sveltejs/kit';


export async function load({ fetch,cookies }) {
    const accessToken = cookies.get("access_token") || null;
    if (!accessToken) {
        throw redirect(302, "/admin/login")
    }

    const seo = await getSeo(fetch, accessToken)

    const contacts = await getContacts(fetch, accessToken, {limit: 25})

    const services = await getServices(fetch,accessToken, {limit: 25})

    const location = await getLocation(fetch, accessToken)

    const socialMedias = await getSocialMedias(fetch, accessToken, {limit: 25})
    return {
        seo,
        contacts,
        services,
        location,
        socialMedias,
    }


}