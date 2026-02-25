import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const BookmarkLeftBar = () => {
    return (
        <Card className=" rounded-3 border-1  border-light-subtle overflow-hidden">
            <Card.Body className="pt-3 pb-0 d-flex flex-column gap-3">
                <div className="fw-semibold" style={{ fontSize: "0.75rem" }}>
                    <Link to={"/"} className="text-decoration-none text-black">
                        <div className="d-flex justify-content-start align-items-end">
                            <div
                                style={{ width: "16px", height: "16px" }}
                                className="me-1 d-flex justify-content-center align-items-center">
                                <svg
                                    className="d-block"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    id="bookmark-fill-small"
                                    aria-hidden="true"
                                    role="none"
                                    data-supported-dps="16x16"
                                    fill="currentColor">
                                    <path d="M13 4a3 3 0 00-3-3H3v14l5-4.5 5 4.5z"></path>
                                </svg>
                            </div>
                            <div className=""> Elementi salvati</div>
                        </div>
                    </Link>
                </div>
                <div className="fw-semibold" style={{ fontSize: "0.75rem" }}>
                    <Link to={"/"} className="text-decoration-none text-black">
                        <div className="d-flex justify-content-start align-items-center">
                            <div
                                style={{ width: "16px", height: "16px" }}
                                className="me-1 d-flex justify-content-center align-items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    id="group-small"
                                    aria-hidden="true"
                                    role="none"
                                    data-supported-dps="16x16"
                                    fill="currentColor">
                                    <path d="M8.5 7h-1A1.5 1.5 0 006 8.5V14h4V8.5A1.5 1.5 0 008.5 7zM12.75 8h-.5A1.25 1.25 0 0011 9.25V14h3V9.25A1.25 1.25 0 0012.75 8z"></path>
                                    <circle cx="8" cy="4" r="2"></circle>
                                    <circle cx="12.5" cy="5.5" r="1.5"></circle>
                                    <path d="M3.75 8h-.5A1.25 1.25 0 002 9.25V14h3V9.25A1.25 1.25 0 003.75 8z"></path>
                                    <circle cx="3.5" cy="5.5" r="1.5"></circle>
                                </svg>
                            </div>
                            <div className=""> Gruppi</div>
                        </div>
                    </Link>
                </div>
                <div className="fw-semibold" style={{ fontSize: "0.75rem" }}>
                    <Link to={"/"} className="text-decoration-none text-black">
                        <div className="d-flex justify-content-start align-items-center">
                            <div
                                style={{ width: "16px", height: "16px" }}
                                className="me-1 d-flex justify-content-center align-items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    id="newspaper-small"
                                    aria-hidden="true"
                                    role="none"
                                    data-supported-dps="16x16"
                                    fill="currentColor">
                                    <path d="M13 4v8H3V4h10m2-2H1v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V2zm-3 3H4v2h8V5zM7 8H4v3h3V8zm5 0H8v1h4V8zm0 2H8v1h4v-1z"></path>
                                </svg>
                            </div>
                            <div className=""> Newsletter</div>
                        </div>
                    </Link>
                </div>
                <div className="fw-semibold" style={{ fontSize: "0.75rem" }}>
                    <Link
                        to={"/"}
                        className="text-decoration-none text-black mb-3">
                        <div className="d-flex justify-content-start align-items-center">
                            <div
                                style={{ width: "16px", height: "16px" }}
                                className="me-1 d-flex justify-content-center align-items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    id="calendar-small"
                                    aria-hidden="true"
                                    role="none"
                                    data-supported-dps="16x16"
                                    fill="currentColor">
                                    <path d="M2 2v9a3 3 0 003 3h6a3 3 0 003-3V2zm8.5 1.5a1 1 0 11-1 1 1 1 0 011-1zm-5 0a1 1 0 11-1 1 1 1 0 011-1zM12 11a1 1 0 01-1 1H5a1 1 0 01-1-1V7h8z"></path>
                                </svg>
                            </div>
                            <div className=""> Eventi</div>
                        </div>
                    </Link>
                </div>
                <div className=""></div>
            </Card.Body>
        </Card>
    );
};

export default BookmarkLeftBar;
