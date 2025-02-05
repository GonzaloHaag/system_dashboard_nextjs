'use client';
import { deleteProductWithId } from "@/actions";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";
export const ButtonDeleteProduct = ({ productId,productImage }: { productId: number,productImage:string | null }) => {

    const clickDeleteProduct = async () => {
        const respuesta = await deleteProductWithId(productId,productImage);
        if (!respuesta.ok) {
            toast.error(respuesta.message);
            return;
        }
        toast.warning(respuesta.message);
    }
    return (
        <button type="button" title="Borrar" onClick={clickDeleteProduct}>
            <Trash2Icon className="text-red-600" />
        </button>
    )
}
