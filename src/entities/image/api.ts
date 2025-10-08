import { api } from "@shared/api/base";
import type { ImageModel } from "./model";



export async function uploadImage(fetchFn: typeof fetch, token: string, file: any){
    const formData = new FormData();
    formData.append('image', file);
    return await api<ImageModel>(fetchFn, '/admin/image', {
      method: 'POST',
      body: formData,
      headers:{
        'Content-Type': 'multipart/form-data',
      }

    }, token);
}