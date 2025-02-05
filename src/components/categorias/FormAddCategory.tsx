'use client';

import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { addCategory } from "@/actions";
import { toast } from "sonner";

interface Props {
    userId: number;
}

interface CategoryInputs {
    nombre: string;
    imagen: FileList | null;
}

export const FormAddCategory = ({ userId }: Props) => {
    const { handleSubmit, register, formState: { isValid, isSubmitting }, watch } = useForm<CategoryInputs>({
        defaultValues: {
            nombre: '',
            imagen: null
        }
    });

    const router = useRouter();
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const formCategorySubmit: SubmitHandler<CategoryInputs> = async (data) => {
        const respuesta = await addCategory(userId, data.nombre, data.imagen && data.imagen[0]);
        if (!respuesta.ok) {
            toast.error(respuesta.message);
            return;
        }
        if (isValid) {
            toast.success(respuesta.message);
            router.back();
        }
    };

    // Escuchar cambios en el input de imagen
    const imagenSeleccionada = watch('imagen');

    useEffect(() => {
        if (imagenSeleccionada && imagenSeleccionada.length > 0) {
            const file = imagenSeleccionada[0];
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);

            // Limpia la URL cuando se desmonta o cambia la imagen
            return () => URL.revokeObjectURL(imageUrl);
        } else {
            setPreviewImage(null);
        }
    }, [imagenSeleccionada]);

    return (
        <form onSubmit={handleSubmit(formCategorySubmit)} className="form_class_global">
            <div className="flex flex-col items-start gap-y-2">
                <label htmlFor="nombre-category">Nombre*</label>
                <Input id="nombre-category" type="text" {...register('nombre', { required: true })} required placeholder="Ej: relojes" />
            </div>

            <div className="flex flex-col items-start gap-y-2">
                <label htmlFor="imagen-category">Imagen</label>
                <Input
                    id="imagen-category"
                    type="file"
                    {...register('imagen', { required: false })}
                    accept="image/png, image/jpeg, image/webp, image/avif"
                />

                {/* Vista previa de la imagen seleccionada */}
                {previewImage && (
                    <div className="mt-2">
                        <Image
                            src={previewImage}
                            alt="Vista previa de la imagen seleccionada"
                            width={100}
                            height={100}
                            className="rounded-md object-cover border border-gray-300 relative"
                        />
                    </div>
                )}
            </div>

            <div className="flex items-center gap-x-4 justify-end">
                <Button variant={'outline'} type="button" onClick={() => router.back()} title="Cancelar">
                    Cancelar
                </Button>
                <Button variant={'default'} type="submit" disabled={isSubmitting} title="Guardar">
                    {isSubmitting ? 'Guardando...' : 'Guardar'}
                </Button>
            </div>
        </form>
    );
};
