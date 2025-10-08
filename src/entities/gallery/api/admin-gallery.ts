import { api } from "@shared/api/base"
import type { AdminGalleryCreateModel, AdminGalleryModel } from "../model/gallery"



const GALLERY_ADMIN_PATH = "/admin/gallery"

export interface AdminGalleriesQueryParams {
    id?: number
    published?:boolean

    limit?: number
    offset?: number
}

export async function getGalleries(fetchFn: typeof fetch, token: string, params: AdminGalleriesQueryParams) {
    // @ts-ignore
    const searchParams = new URLSearchParams({...params})
    return await api<AdminGalleryModel[]>(fetchFn, `${GALLERY_ADMIN_PATH}?${searchParams}`, {}, token)
}

export async function createGallery(fetchFn: typeof fetch, token: string, payload: AdminGalleryCreateModel) {
    return await api<AdminGalleryModel>(fetchFn, GALLERY_ADMIN_PATH, {
        method: "POST",
        body: JSON.stringify(payload)
    }, token)
}

export async function updateGallery(fetchFn: typeof fetch, token: string, id: number, payload: AdminGalleryCreateModel) {
    return await api<AdminGalleryModel>(fetchFn, `${GALLERY_ADMIN_PATH}/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload)
    }, token)
}

export async function getGalleryByID(fetchFn: typeof fetch, token: string, id: number) {
    return await api<AdminGalleryModel>(fetchFn, `${GALLERY_ADMIN_PATH}/${id}`, {}, token)
}

export async function deleteGallery(fetchFn: typeof fetch, token: string, id: number) {
    return await api<null>(fetchFn, `${GALLERY_ADMIN_PATH}/${id}`, {method:"DELETE"}, token)
}