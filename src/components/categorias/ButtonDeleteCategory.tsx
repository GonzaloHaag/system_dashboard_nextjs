'use client';
import { deleteCategoryWithId } from "@/actions";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";
export const ButtonDeleteCategory = ({ categoryId,imagenCategory }: { categoryId: number,imagenCategory:string | null }) => {

    const clickDeleteCategory = async () => {
        const respuesta = await deleteCategoryWithId(categoryId,imagenCategory);
        if (!respuesta.ok) {
            toast.error(respuesta.message);
            return;
        }
        toast.warning(respuesta.message);
    }
    return (
        <button type="button" title="Borrar" onClick={clickDeleteCategory}>
            <Trash2Icon className="text-red-600" />
        </button>
    )
}
