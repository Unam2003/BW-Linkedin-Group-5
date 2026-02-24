import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const TryPremium = () => {
    return (
        <Card className=" rounded-3 border-1  border-light-subtle overflow-hidden">
            <Card.Body className="pt-3 pb-0 d-flex flex-column">
                <div className="fw-semibold" style={{ fontSize: "0.75rem" }}>
                    <Link
                        to={"/"}
                        className="text-decoration-none text-secondary fw-normal">
                        <div className="mb-2">
                            Accedi a strumenti e informazioni in esclusiva
                        </div>
                    </Link>
                </div>
                <div className="fw-semibold" style={{ fontSize: "0.75rem" }}>
                    <Link to={"/"} className="text-decoration-none text-black">
                        <div className="d-flex justify-content-start align-items-start">
                            <div
                                style={{ width: "16px", height: "16px" }}
                                className="me-1 d-flex justify-content-center align-items-center">
                                <svg
                                    className="d-block"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    id="premium-chip-v2-medium"
                                    aria-hidden="true"
                                    role="none"
                                    data-supported-dps="24x24">
                                    <path
                                        d="M20.01 20.01c.63-.63.99-1.48.99-2.38V6.38C21 4.51 19.49 3 17.62 3H6.38c-.9 0-1.75.36-2.38.99l16.02 16.02z"
                                        fill="#e7a33e"></path>
                                    <path
                                        d="M3.99 3.99C3.36 4.62 3 5.48 3 6.38v11.25c0 1.87 1.51 3.38 3.38 3.38h11.25c.9 0 1.75-.36 2.38-.99L3.99 3.99z"
                                        fill="#c37d16"></path>
                                </svg>
                            </div>
                            <div className=""> Prova Premium per 0 EUR</div>
                        </div>
                    </Link>
                </div>
                <div className="pt-3"></div>
            </Card.Body>
        </Card>
    );
};

export default TryPremium;
