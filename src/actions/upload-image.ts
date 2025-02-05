'use server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');
export const uploadImage = async (image: File) => {
    try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString('base64');
        const imageType = image.type;

        const response = await cloudinary.uploader.upload(`data:${imageType};base64,${base64Image}`, {
            folder: 'sistema_pocho'
        });

        return response.secure_url;

    } catch (error) {
        console.error('Error al subir imagen a cloudinary', error);
        throw new Error('Error al subir la imagen')
    }
}