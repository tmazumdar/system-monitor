import { useEffect, useState } from "react";
import _ from "lodash";

let timer;
export default function ProcessCard() {
    const [processes, setProcesses] = useState([]);
    const [detailed, setDetailed] = useState(false);
    const [sortBy, setSortBy] = useState('cpu');
    const [sortByDesc, setSortByDesc] = useState(true);

    var loadProcesses = async () => {
        const response = await fetch(`http://localhost:5050/system/processes/` + (detailed ? `detailed/` : ``));
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            console.error(message);
            return;
        }

        const data = await response.json();
        return data;
    };        
    
    var updateProcs = async () => {
        var data = await loadProcesses();
        
        if (data && data.proc.length > 0)
            setProcesses(sortProcesses(data.proc));
    };

    function toggleDetailed() {
        setDetailed(!detailed);
    };

    function sortProcesses(proc) {
        let sorted;
        if (sortBy == 'mem') {
            sorted = _.sortBy(proc, (i) => { return i.mem.usage; });            
        } else 
            sorted = _.sortBy(proc, sortBy);

        return sortByDesc ? sorted.reverse() : sorted;
    }

    function handleSortByClick(val) {
        if (sortBy == val) {
            setSortByDesc(!sortByDesc);
        }
        setSortBy(val);
    }

    function getCaret() {
        return sortByDesc ?
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>  :
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                <path fillRule="evenodd" d="M11.78 9.78a.75.75 0 0 1-1.06 0L8 7.06 5.28 9.78a.75.75 0 0 1-1.06-1.06l3.25-3.25a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06Z" clipRule="evenodd" />
            </svg>
    }

    function getSortButton(val) {
        return (
            <button className="btn btn-xs" onClick={() => handleSortByClick(val)}>
                {val.toUpperCase()}
                {val == sortBy ? getCaret() : ""}
            </button>
        )
    }

    useEffect(() => {
        updateProcs();
    }, [])

    useEffect(() => {
        setProcesses(sortProcesses(processes));
    }, [sortBy])

    if (timer) {
        clearTimeout(timer);
    }
    timer = setTimeout(updateProcs, 1000)

    return (
        <div className="flex p-4 w-full">
            <div className="card bg-base-100 w-full shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">
                        {detailed ? "All" : "Top"} Processes 
                        <input type="checkbox" className="toggle toggle-xs" defaultChecked={detailed} onClick={toggleDetailed} />
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="table table-xs table-fixed">
                            <thead>
                                <tr>
                                    <th>{getSortButton('pid')}</th>
                                    <th>{getSortButton('name')}</th>
                                    <th>{getSortButton('cpu')}</th>
                                    <th>{getSortButton('mem')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {processes && processes.map(p => {
                                    return (
                                        <tr>
                                            <td>{p.pid}</td>
                                            <td>{p.name}</td>
                                            <td>{p.cpu}</td>
                                            <td>{(p.mem.usage * 100).toFixed(0)} %</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};