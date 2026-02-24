import { Link } from "react-router-dom";

const AdvertisingForBar = (props) => {
    return (
        <div>
            <Link to="/">
                <div className="text-center">
                    <img
                        className="w-100 "
                        style={{ maxWidth: "300px" }}
                        src={props.src}
                        alt={props.alt}
                    />
                </div>
            </Link>
        </div>
    );
};

export default AdvertisingForBar;
