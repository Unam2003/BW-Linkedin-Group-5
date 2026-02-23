import { Button } from "react-bootstrap";

const PersonForYou = (props) => {
    return (
        <div>
            <div
                className="d-flex mt-3"
                style={{ gap: "0.8rem", height: "50px" }}>
                <div>
                    <img
                        style={{ width: "48px" }}
                        className="rounded-5"
                        src={props.image}
                        alt={props.name}
                        onError={(e) => {
                            e.currentTarget.src =
                                "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";
                        }}
                    />
                </div>
                <div>
                    <div className="fw-semibold">{props.name}</div>
                    <div style={{ fontSize: "0.8rem" }}>{props.title}</div>
                </div>
            </div>
            <div className="d-flex" style={{ gap: "0.8rem" }}>
                <div style={{ width: "48px" }}></div>
                <Button
                    variant="outline-secondary"
                    size="sm"
                    className="rounded-pill px-3 d-inline-flex align-items-center gap-1 mt-3"
                    onClick={props.onClick}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="send-privately-small"
                        fill="black"
                        aria-hidden="true"
                        data-rtl="true"
                        data-supported-dps="16x16"
                        viewBox="0 0 16 16"
                        data-token-id="232"
                        width="16"
                        height="16"
                        className=""
                        role="img"
                        aria-label="">
                        <path d="M14 2 0 6.67l5 2.64 5.67-3.98L6.7 11l2.63 5z"></path>
                    </svg>
                    <span className="fw-semibold"> Messaggio</span>
                </Button>
            </div>
            <hr className="mt-2 mb-0 text-body-tertiary" />
        </div>
    );
};

export default PersonForYou;
