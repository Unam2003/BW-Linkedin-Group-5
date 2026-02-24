import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import AnalysisLeftBar from "./AnalysisLeftBar";
import TryPremium from "./TryPremium";
import BookmarkLeftBar from "./BookmarkLeftBar";
import { useState } from "react";

const CollapseLeftBar = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {!open && (
                <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="collapse-left-bar"
                    aria-expanded={open}
                    className="text-dark fs-bolder border-0"
                    style={{ backgroundColor: "#f4f2ee" }}>
                    Vedi altro{" "}
                    <svg
                        style={{ width: "16px", height: "16px" }}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        id="chevron-down-small"
                        aria-hidden="true"
                        role="none"
                        data-supported-dps="16x16"
                        fill="currentColor">
                        <path d="M1 5l7 4.61L15 5v2.39L8 12 1 7.39z"></path>
                    </svg>
                </Button>
            )}
            <Collapse in={open}>
                <div id="collapse-left-bar" className="">
                    <div className="mb-2">
                        <AnalysisLeftBar />
                    </div>
                    <div className="mb-2">
                        <TryPremium />
                    </div>
                    <div className="mb-2">
                        <BookmarkLeftBar />
                    </div>
                </div>
            </Collapse>
            {open && (
                <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="collapse-left-bar"
                    aria-expanded={open}
                    className="text-dark fs-bolder border-0"
                    style={{ backgroundColor: "#f4f2ee" }}>
                    Meno dettagli{" "}
                    <svg
                        style={{ width: "16px", height: "16px" }}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        id="chevron-up-small"
                        aria-hidden="true"
                        role="none"
                        data-supported-dps="16x16"
                        fill="currentColor">
                        <path d="M15 11L8 6.39 1 11V8.61L8 4l7 4.61z"></path>
                    </svg>
                </Button>
            )}
        </>
    );
};

export default CollapseLeftBar;
