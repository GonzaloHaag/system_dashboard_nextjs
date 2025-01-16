'use client';
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area } from 'recharts';

const data = [
    {
        name: 'Ene',
        ventas: 4000,
    },
    {
        name: 'Feb',
        ventas: 3000,
    },
    {
        name: 'Mar',
        ventas: 2000,
    },
    {
        name: 'Abr',
        ventas: 2780,
    },
    {
        name: 'May',
        ventas: 1890,
    },
    {
        name: 'Jun',
        ventas: 2390,
    },
];
export const SalesChart = () => {
    return (
        <div className='w-full h-[400px]'>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="ventas" stroke="#8884d8" fill="#1d4ed8" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}
