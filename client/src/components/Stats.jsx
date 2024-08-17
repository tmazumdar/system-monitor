import { useEffect, useState } from "react";
import Card from "./Card";
import CPUCard from "./CPUCard";
import RAMCard from "./RAMCard";

let timer;

export default function Stats() {
    const [CPU, setCPU] = useState(0);
    const [l, setLoad] = useState(0);
    const [percentMem, setMem] = useState(0);
    const [freeMem, setFreeMem] = useState(0);
    const [totalMem, setTotalMem] = useState(0);

    async function loadStats() {
        const response = await fetch(`http://localhost:5050/system/`);
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

        setCPU(cpu);
        setLoad(load);
        let ramPercent = 100*((totalRAM - freeRAM) / totalRAM)
        setMem(ramPercent.toFixed(2));
        setFreeMem(freeRAM);
        setTotalMem(totalRAM);
    };

    // This method fetches the system data from the backend.
    useEffect(() => {
        async function getStats() {
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
        <div className="flex justify-center space-x-4">
            <CPUCard title={"CPU"} value={CPU}></CPUCard>
            <Card title={"Load"} value={l[0]}></Card>
            <RAMCard title={"RAM"} value={percentMem} free={freeMem} total={totalMem}></RAMCard>
        </div>
    );
};