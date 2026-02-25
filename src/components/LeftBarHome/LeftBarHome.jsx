import AnalysisLeftBar from "./AnalysisLeftBar";
import BookmarkLeftBar from "./BookmarkLeftBar";
import CollapseLeftBar from "./CollapseLeftBar";
import PresentationLeftBar from "./PresentationLeftBar";
import TryPremium from "./TryPremium";

const LeftBarHome = (props) => {
    return (
        <div style={{ width: props.size }} className="d-flex flex-column gap-2">
            <div
                className={props.addClass + " d-flex flex-column gap-2"}
                style={{ width: props.size }}>
                <PresentationLeftBar />

                {props.size === "100%" ? (
                    <CollapseLeftBar />
                ) : (
                    <>
                        <AnalysisLeftBar />
                        <TryPremium />
                        <BookmarkLeftBar />
                    </>
                )}
            </div>
        </div>
    );
};

export default LeftBarHome;
