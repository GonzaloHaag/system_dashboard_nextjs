'use client';
import { Area, Bar, BarChart, CartesianGrid, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


const data = [
    {
        name: 'Ene',
        Total: 4000,
    },
    {
        name: 'Feb',
        Total: 3000,
    
    },
    {
        name: 'Mar',
        Total: 2000,
   
    },
    {
        name: 'Abr',
        Total: 2780,
  
    },
    {
        name: 'Jun',
        Total: 1890,

    },
    {
        name: 'Jul',
        Total:2390,
 
    },
];

export const WinningsChart = () => {
    return (
        <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart width={150} height={40} data={data}>
                    <Bar dataKey="Total" fill="#1d4ed8" activeBar={<Rectangle fill="black" stroke="black" />} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey='name' />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`,'Total']} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
