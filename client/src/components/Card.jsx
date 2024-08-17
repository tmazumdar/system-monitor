export default function Card({ title, value }) {
    return (
        <div className="card bg-base-100 w-80 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <div className="radial-progress bg-accent text-primary-content border-primary border-4" 
                    style={{ "--value": value, "--size": "12rem", "--thickness": "4px" }} role="progressbar">{value} %</div>
            </div>
        </div>
    );
};