import { useEffect, useState } from "react";

export default function CPUCard({ title, value }) {
    const [cores, setCores] = useState(0);
    const [model, setModel] = useState("");
    const [clockSpeed, setClockSpeed] = useState(0);
    const [user, setUser] = useState(0);
    const [nice, setNice] = useState(0);
    const [sys, setSys] = useState(0);
    const [idle, setIdle] = useState(0);

    function aggregateCPU(cpus) {
        let count = cpus.length;
        
        var r = cpus.map(x => {
            let totalTicks = x.times.user + x.times.nice + x.times.sys + x.times.idle + x.times.irq;
            return {
                user: (x.times.user / totalTicks) * 100,
                nice: (x.times.nice / totalTicks) * 100,
                sys: (x.times.sys / totalTicks) * 100,
                idle: (x.times.idle / totalTicks) * 100,
            }
        });
        setUser((r.map(x => x.user).reduce((a,c) => a+c, 0) / count).toFixed(0));
        setNice((r.map(x => x.nice).reduce((a,c) => a+c, 0) / count).toFixed(0));
        setSys((r.map(x => x.sys).reduce((a,c) => a+c, 0) / count).toFixed(0));
        setIdle((r.map(x => x.idle).reduce((a,c) => a+c, 0) / count).toFixed(0));
    };
    
    useEffect(() => {
        if (value.length > 0) {
            setCores(value.length);
            setModel(value[0].model);        
            setClockSpeed(((value.map(x => x.speed).reduce((a,c) => a + c, 0) / value.length) / 1000).toFixed(2));
            aggregateCPU(value);
        }
    }, [value]);

    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
                <h3 className="card-title text-left">{model}</h3>
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title">Clock speed</div>
                        <div className="stat-value">{clockSpeed} GHz</div>
                        <progress className="progress" value={clockSpeed} max="5"></progress>
                        <div className="stat-desc">{cores} cores</div>
                    </div>
                </div>
                <div className="pt-4">
                    <div className="flex items-stretch h-3 bg-slate-300 rounded-full">
                        <div className="h-3 bg-green-400 rounded-l-full tooltip" data-tip={"user: "+user+"%"} style={{width: user+"%"}}></div>
                        <div className="h-3 bg-orange-400 tooltip" data-tip={"system: "+sys+"%"}style={{width: sys+"%"}}></div>
                        <div className="h-3 bg-red-400 tooltip" data-tip={"nice: "+nice+"%"} style={{width: nice+"%"}}></div>
                        <div className="h-3 bg-blue-400 rounded-r-full tooltip" data-tip={"idle: "+idle+"%"} style={{width: idle+"%"}}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};