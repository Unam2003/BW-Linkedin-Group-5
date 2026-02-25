import AdvertisingForBar from "./AdvertisingForBar";
import PagesForYouForBar from "./PagesForYouForBar";
import PeopleYouMayKnow from "./PeopleYouMayKnow";
import SettingCards from "./SettingCards";

const RightBar = (props) => {
    return (
        <div
            className="d-flex flex-column justify-content-start align-items-stretch position-relative h-100"
            style={{ gap: "0.8rem", maxWidth: props.size }}>
            <SettingCards />
            <AdvertisingForBar
                src="\advertising\advertising-for-bar.png"
                alt="ads for you"
            />

            <PeopleYouMayKnow />

            <PagesForYouForBar />

            <div className="sticky-top" style={{ top: "94px" }}>
                <AdvertisingForBar
                    src="\advertising\advertising-for-bar.png"
                    alt="ads for you"
                />
            </div>
        </div>
    );
};

export default RightBar;
