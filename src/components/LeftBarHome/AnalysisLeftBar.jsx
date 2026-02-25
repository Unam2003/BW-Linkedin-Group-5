import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const AnalysisLeftBar = () => {
    return (
        <Card className=" rounded-3 border-1  border-light-subtle overflow-hidden">
            <Card.Body className="pt-3 pb-0 d-flex flex-column">
                <div className="fw-semibold" style={{ fontSize: "0.75rem" }}>
                    <Link to={"/"} className="text-decoration-none text-black">
                        <div className="mb-2">Visualizza tutte le analisi</div>
                    </Link>
                </div>
                <div className="fw-semibold" style={{ fontSize: "0.75rem" }}>
                    <Link to={"/"} className="text-decoration-none text-black">
                        <div className="d-flex justify-content-between">
                            <div className=""> Collegamenti</div>
                            <div style={{ width: "16px", height: "16px" }}>
                                <svg
                                    className="w-100"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    id="connect-small"
                                    aria-hidden="true"
                                    role="none"
                                    data-supported-dps="16x16"
                                    fill="currentColor">
                                    <path d="M9 4a3 3 0 11-3-3 3 3 0 013 3zM6.75 8h-1.5A2.25 2.25 0 003 10.25V15h6v-4.75A2.25 2.25 0 006.75 8zM13 8V6h-1v2h-2v1h2v2h1V9h2V8z"></path>
                                </svg>
                            </div>
                        </div>
                        <div className="fw-normal text-secondary">
                            Espandi la tua rete
                        </div>
                    </Link>
                </div>
                <div className="pt-3"></div>
            </Card.Body>
        </Card>
    );
};

export default AnalysisLeftBar;
