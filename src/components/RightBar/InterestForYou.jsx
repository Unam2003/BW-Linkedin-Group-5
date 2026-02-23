import { Button } from "react-bootstrap";

const InterestForYou = (props) => {
    return (
        <div className="d-flex" style={{ gap: "0.8rem" }}>
            <div>
                <img
                    style={{ width: "40px" }}
                    className="rounded-1"
                    src={props.imgSrc}
                    alt={props.title}
                />
            </div>
            <div>
                <div className="fw-semibold">{props.title}</div>
                <div style={{ fontSize: "0.8rem" }}>{props.subtitle}</div>
                <div
                    className="text-body-tertiary"
                    style={{ fontSize: "0.8rem" }}>
                    {props.follower} follower
                </div>
                <div>
                    <Button
                        variant="outline-secondary"
                        size="sm"
                        className="rounded-pill px-3 d-inline-flex align-items-center gap-1 mt-3"
                        onClick={props.onClick}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            id="add-small"
                            fill="black"
                            aria-hidden="true"
                            data-supported-dps="16x16"
                            viewBox="0 0 16 16"
                            data-token-id="86"
                            width="16"
                            height="16"
                            className=""
                            role="img"
                            aria-label="">
                            <path d="M14 9H9v5H7V9H2V7h5V2h2v5h5z"></path>
                        </svg>
                        <span className="fw-semibold"> Segui</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default InterestForYou;
