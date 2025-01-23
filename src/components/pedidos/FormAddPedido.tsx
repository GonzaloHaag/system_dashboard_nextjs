'use client';

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Select from 'react-select';
import { SelectContent, SelectGroup, SelectItem, SelectLabel, Select as SelectShadcn, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { addClient } from "@/actions";
import { toast } from "sonner";
import { capitalizeFirstLetter } from "@/lib/capitalizeFirstLetter";
import { useState } from "react";

interface Props {
    userId: number;
    clientes: {
        id: number;
        nombre: string;
    }[];
    productos: {
        id: number;
        titulo: string;
    }[];
}
type InputsPedido = {
    clienteType: { label: string, value: number }
    productosType: { label: string, value: number }
    fechaEntrega: Date;
    estado: 'pending' | 'inProgress' | 'completed';
    productos: number[];
}
export const FormAddPedido = ({ userId, clientes, productos }: Props) => {

    const { register, handleSubmit, formState: { isValid, isSubmitting }, control } = useForm<InputsPedido>({
        defaultValues: {
            estado: 'pending'
        }
    });
    const [orderItems, setOrderItems] = useState<({ productId: number, quantity: number })[]>([]);

    const buttonAddProduct = () => {
        setOrderItems([...orderItems, { productId: 0, quantity: 1 }]);
    }

    const buttonRemoveProduct = (index: number) => {
        setOrderItems(orderItems.filter((_, i) => i !== index));
    }

    const router = useRouter();
    const formAddPedidoSubmit: SubmitHandler<InputsPedido> = async (data) => {
        // const respuesta = await addClient(userId,data.nombre,data.ciudad,data.direccion,data.status);
        // if(!respuesta.ok) {
        //     toast.error(respuesta.message);
        //     return;
        // }
        // if(isValid) {
        //     toast.success(respuesta.message);
        //     router.back();
        // }

        console.log(data);

    }

    const clientsOptions = clientes.map((cliente) => ({
        label: capitalizeFirstLetter(cliente.nombre),
        value: cliente.id
    }));

    const productsOptions = productos.map((producto) => ({
        label: capitalizeFirstLetter(producto.titulo),
        value: producto.id
    }));

    return (
        <form onSubmit={handleSubmit(formAddPedidoSubmit)} className="form_class_global">
            <div className="flex flex-col items-start gap-y-2">
                <label htmlFor="cliente">Cliente*</label>
                <Controller
                    name="clienteType"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Select
                            id="cliente"
                            required
                            className="w-full focus:outline-neutral-900"
                            placeholder='Seleccionar cliente'
                            noOptionsMessage={() => 'No se encontraron resultados'}
                            {...field}
                            options={clientsOptions}
                        />
                    )}
                />
            </div>
            <div className="flex flex-col items-start gap-y-2">
                <label>Productos*</label>
                {
                    orderItems.length > 0 && (
                        orderItems.map((orderItem, index) => (
                            <div key={index} className="grid grid-cols-6 gap-x-4">
                                <Controller
                                    name="productosType"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <Select
                                            id={`productos-${index}`}
                                            required
                                            className="w-full focus:outline-neutral-900 col-span-3"
                                            placeholder='Seleccionar productos'
                                            noOptionsMessage={() => 'No se encontraron resultados'}
                                            {...field}
                                            options={productsOptions}
                                        />
                                    )}
                                />
                                <Input type="number" placeholder="Cantidad" defaultValue={1} className="col-span-1" min={1} />
                                <Button type="button" title="Eliminar" variant={"destructive"} className="col-span-2" onClick={() => buttonRemoveProduct(index)}>
                                    Eliminar
                                </Button>
                            </div>
                        ))
                    )
                }
                <Button variant={'default'} type="button" title="Agregar producto" onClick={buttonAddProduct}>
                    Agregar producto
                </Button>
            </div>
            <div className="grid grid-cols-2 gap-x-8">
                <div className="flex flex-col items-start gap-y-2">
                    <label htmlFor="estado">Estado*</label>
                    <Controller
                        name="estado"
                        control={control}
                        defaultValue="pending"
                        render={({ field }) => (
                            <SelectShadcn defaultValue={field.value}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Seleccionar estado" />
                                </SelectTrigger>
                                <SelectContent id="estado">
                                    <SelectGroup>
                                        <SelectItem value={'pending'}>Pendiente</SelectItem>
                                        <SelectItem value={'inProgress'}>En progreso</SelectItem>
                                        <SelectItem value={'completed'}>Completado</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </SelectShadcn>
                        )}
                    />
                </div>
                <div className="flex flex-col items-start gap-y-2">
                    <label htmlFor="fecha_entrega">Fecha de entrega *</label>
                    <Input type="date" id="fecha_entrega" required {...register('fechaEntrega', { required: true })} />
                </div>
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
