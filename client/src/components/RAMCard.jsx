export default function RAMCard({ title, value, free, total }) {
    return (
        <div className="card bg-base-100 w-80 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <div className="radial-progress bg-accent text-primary-content border-primary border-4" 
                    style={{ "--value": value, "--size": "10rem", "--thickness": "4px" }} role="progressbar">
                    {value} %
                </div>
                <div className="pt-4">
                    {((total - free) / 1000000000).toFixed(2)} GB / {(total / 1000000000).toFixed(2)} GB Used 
                </div>                    
            </div>
        </div>
    );
};