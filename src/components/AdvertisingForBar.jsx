// import { Link } from "react-router-dom";

const AdvertisingForBar = (props) => {
    return (
        <div>
            {/* <Link to="/"> */}
            <img className="w-100" src={props.src} alt={props.alt} />
            {/* </Link> */}
        </div>
    );
};

export default AdvertisingForBar;
