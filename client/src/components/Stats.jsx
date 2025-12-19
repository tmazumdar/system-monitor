import { useEffect, useState } from "react";
import Card from "./Card";
import CPUCard from "./CPUCard";
import RAMCard from "./RAMCard";

let timer;

export default function Stats() {
    const [CPU, setCPU] = useState(0);
    const [percentLoad, setLoad] = useState(0);
    const [percentMem, setMem] = useState(0);
    const [freeMem, setFreeMem] = useState(0);
    const [totalMem, setTotalMem] = useState(0);

    async function loadStats() {
        const response = await fetch(`/system/api`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            console.error(message);
            return;
        }

        const data = await response.json();
        setStats(data);
    };

    function setStats(data) {
        const {cpu, load, freeRAM, totalRAM} = data;
        let ramPercent = 100*((totalRAM - freeRAM) / totalRAM)
        let loadPercent = load.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        setCPU(cpu);
        setLoad(loadPercent.toFixed(2));
        setMem(ramPercent.toFixed(2));
        setFreeMem(freeRAM);
        setTotalMem(totalRAM);
    };

    useEffect(() => {
        async function getStats() {
            // This method fetches the system data from the backend.
            var data = await loadStats();
            
            if (!!data) {
                setStats(data);
            }
            return;
        };
        getStats();
    }, []);

    if (timer) {
        clearTimeout(timer)
    }
    timer = setTimeout(() => {
        loadStats();
    }, 1000)



    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <CPUCard title={"CPU"} value={CPU}></CPUCard>
            <Card title={"Load"} value={percentLoad}></Card>
            <RAMCard title={"RAM"} value={percentMem} free={freeMem} total={totalMem}></RAMCard>
        </div>
    );
};