'use client';

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Input } from "../ui/input";
import Select from 'react-select';
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { addProduct } from "@/actions";
import { toast } from "sonner";
import { capitalizeFirstLetter } from "@/lib/capitalizeFirstLetter";
import { Textarea } from "../ui/textarea";
interface Props {
    userId: number;
    categories: {
        id: number;
        nombre: string;
    }[];
}
type InputsProduct = {
    titulo: string;
    precio: number;
    stock: number;
    imagen: string | null;
    color: string;
    description:string;
    categoryType : { label:string, value:number }
}
export const FormAddProduct = ({ userId, categories }: Props) => {

    const { register, handleSubmit, formState: { isValid, isSubmitting }, control } = useForm<InputsProduct>({
        defaultValues: {
            titulo: '',
            stock: 0,
            imagen: null,
            color: '#000000',
        }
    });
    const router = useRouter();
    const formAddProductSubmit: SubmitHandler<InputsProduct> = async (data) => {
        const respuesta = await addProduct(
            userId,
            data.titulo,
            data.precio,
            data.stock,
            data.imagen,
            data.color,
            data.description,
            data.categoryType.value
        );
        if (!respuesta.ok) {
            toast.error(respuesta.message);
            return;
        }
        if (isValid) {
            toast.success(respuesta.message);
            router.back();
        }

        

    }


    const categoriesOptions = categories.map((category) => ({
        value:category.id,
        label:capitalizeFirstLetter(category.nombre)
    }))


    return (
        <form onSubmit={handleSubmit(formAddProductSubmit)} className="form_class_global">
            <div className="flex flex-col items-start gap-y-2">
                <label htmlFor="titulo">Titulo*</label>
                <Input required id="titulo" type="text" {...register('titulo', { required: true })} placeholder="Ej: Auriculares" />
            </div>
            <div className="grid grid-cols-2 gap-x-8 items-start">
                <div className="flex flex-col items-start gap-y-2">
                    <label htmlFor="precio">Precio*</label>
                    <Input id="precio" type="number" min={0} required {...register('precio', { required: true })} placeholder="0.00" />
                </div>
                <div className="flex flex-col items-start gap-y-2">
                    <label htmlFor="stock">Stock*</label>
                    <Input id="stock" type="number" min={0} required {...register('stock', { required: true })} defaultValue={0} />
                </div>
            </div>
            <div className="flex flex-col items-start gap-y-2">
                <label htmlFor="categoria">Categoría*</label>
                <Controller 
                name="categoryType"
                control={ control }
                rules={{ required:true }}
                render={({ field }) => (
                    <Select
                    id="categoria"
                    required
                    className="w-full focus:outline-neutral-900"
                    placeholder='Seleccionar categoría'
                    noOptionsMessage={() => 'No se encontraron resultados'}
                    {...field}
                    options={ categoriesOptions }
                    />
                )}
                />
            </div>

            <div className="flex flex-col items-start gap-y-2">
                <label htmlFor="color">Seleccionar color*</label>
                <Input id="color" {...register('color',{ required:true })} type="color" required defaultValue={'#000000'} className="h-12 w-32 border rounded-md cursor-pointer"  />
            </div>
            <div className="flex flex-col items-start gap-y-2">
                <label htmlFor="imagen">Imagen</label>
                <Input id="imagen" {...register('imagen',{ required:false })} type="file" />
            </div>
            <div className="flex flex-col items-start gap-y-2">
                <label htmlFor="imagen">Descripción*</label>
                <Textarea {...register('description',{ required:true })} required id="descripcion" />
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
    )
}
