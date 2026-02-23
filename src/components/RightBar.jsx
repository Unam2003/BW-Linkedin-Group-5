import AdvertisingForBar from "./AdvertisingForBar";
import SettingCards from "./SettingCards";

const RightBar = () => {
    return (
        <div
            className="d-flex flex-column justify-content-start align-items-stretch"
            style={{ gap: "0.8rem", maxWidth: "304px" }}>
            <SettingCards />
            <AdvertisingForBar
                src="\advertising\avertising-for-bar.png"
                alt="ads for you"
            />
            <AdvertisingForBar
                src="\advertising\avertising-for-bar.png"
                alt="ads for you"
            />
        </div>
    );
};

export default RightBar;
