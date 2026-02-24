import { Button } from "react-bootstrap";

Button;

const SettingCard = (props) => {
    return (
        <div className="d-flex flex-column justify-content-between align-items-start">
            <div className="d-flex justify-content-between w-100">
                <div className="fw-semibold fs-5">{props.title}</div>
                <Button
                    variant="link"
                    className="p-0 text-muted "
                    onClick={props.onEdit}
                    aria-label={`Modifica ${props.title}`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="edit-medium"
                        fill="currentColor"
                        aria-hidden="true"
                        data-supported-dps="24x24"
                        viewBox="0 0 24 24"
                        data-token-id="74"
                        width="24"
                        height="24"
                        className="b512711f _41141b41 _1f5e429f _5ae27c8d _989e118e ea727eca"
                        role="img"
                        aria-label="">
                        <path d="M21.13 2.86a3 3 0 0 0-4.17 0l-13 13L2 22l6.19-2L21.13 7a3 3 0 0 0 0-4.16zM6.77 18.57l-1.35-1.34L16.64 6 18 7.35z"></path>
                    </svg>
                </Button>
            </div>

            <div className="text-muted small mt-1 text-body-tertiary">
                {props.value}
            </div>
        </div>
    );
};

export default SettingCard;
