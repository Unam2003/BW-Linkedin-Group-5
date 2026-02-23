import AdvertisingForBar from "./AdvertisingForBar";
import PagesForYouForBar from "./PagesForYouForBar";
import SettingCards from "./SettingCards";

const RightBar = (props) => {
    return (
        <div
            className="d-flex flex-column justify-content-start align-items-stretch"
            style={{ gap: "0.8rem", maxWidth: props.size }}>
            <SettingCards />
            <AdvertisingForBar
                src="\advertising\advertising-for-bar.png"
                alt="ads for you"
            />

            <PagesForYouForBar />

            <AdvertisingForBar
                src="\advertising\advertising-for-bar.png"
                alt="ads for you"
            />
        </div>
    );
};

export default RightBar;
