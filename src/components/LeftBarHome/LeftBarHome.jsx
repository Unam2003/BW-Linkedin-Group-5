import AnalysisLeftBar from "./AnalysisLeftBar";
import PresentationLeftBar from "./PresentationLeftBar";

const LeftBarHome = (props) => {
    return (
        <div style={{ width: props.size }} className="d-flex flex-column gap-2">
            <div
                className="position-fixed d-flex flex-column gap-2"
                style={{ width: props.size }}>
                <PresentationLeftBar />
                <AnalysisLeftBar />
            </div>
        </div>
    );
};

export default LeftBarHome;
