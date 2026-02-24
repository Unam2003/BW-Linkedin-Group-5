import { Card } from "react-bootstrap";

const PresentationLeftBar = () => {
    return (
        <Card className=" rounded-3 border-1  border-light-subtle overflow-hidden">
            <div
                className="position-relative"
                style={{
                    height: "60px",
                    backgroundImage: 'url("/default_background.png")',
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                }}></div>
            <Card.Body className="pt-4 pb-0 position-relative ">
                <div
                    className="position-absolute rounded-5 overflow-hidden"
                    style={{
                        height: "72px",
                        width: "72px",
                        backgroundColor: "#ffffff",
                        top: "-36px",
                    }}>
                    <img
                        src="advertising/logo.jpg"
                        alt="poste"
                        className="w-100 h-100 object-fit-cover "
                        onError={(e) => {
                            e.currentTarget.src =
                                "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";
                        }}
                    />
                </div>
                <h6 className="mx-0 mb-1 mt-4">
                    Samuel Valentini{" "}
                    <svg
                        style={{ width: "16px" }}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        id="verified-small"
                        aria-hidden="true"
                        role="none"
                        data-supported-dps="16x16"
                        fill="currentColor">
                        <path d="M8 15l-.86-.29C3.24 13.41 1 10.62 1 7V2.49L8 0l7 2.49V7c0 3.62-2.23 6.41-6.13 7.71L8 15zM3 3.9V7c0 3.53 2.6 5.09 4.78 5.82l.23.08.23-.08C10.01 12.23 13 10.71 13 7V3.9L8 2.11 3 3.9zM9.43 5L7.01 8.02l-1.1-1.1L4.5 8.34l2.67 2.67 4.83-6H9.43z"></path>
                    </svg>
                </h6>

                <div className="clamped" style={{ fontSize: "0.75rem" }}>
                    IT/Technical Project Management | Consulente Informatico
                    presso Self-Empolyed
                </div>
                <div
                    className="text-body-tertiary clamped"
                    style={{ fontSize: "0.75rem" }}>
                    Tuenno, Trentino-Alto Adige
                </div>
                <div
                    className="clamped fw-semibold"
                    style={{ fontSize: "0.75rem" }}>
                    Self-Empolyed
                </div>
                <div className="pt-3"></div>
            </Card.Body>
        </Card>
    );
};

export default PresentationLeftBar;
