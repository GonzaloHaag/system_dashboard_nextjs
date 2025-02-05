'use client';
import { Button } from "./ui/button";

export const ButtonExportCsv = () => {
    // const headers = [
    //     { label: "First Name", key: "firstname" },
    //     { label: "Last Name", key: "lastname" },
    //     { label: "Email", key: "email" }
    // ];
    // const data = [
    //     { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
    //     { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
    //     { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" }
    // ];

    // <CSVLink data={data} headers={headers} filename="clientes.csv" target="_blank" separator=";">
    //     <Button type='button' variant={'outline'} title='Exportar CSV'>
    //         Exportar CSV
    //     </Button>
    // </CSVLink>


    return (
        <Button type='button' variant={'outline'} title='Exportar CSV'>
            Exportar CSV
        </Button>

    );
}
