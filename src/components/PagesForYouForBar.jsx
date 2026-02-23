import { Card } from "react-bootstrap";
import InterestForYou from "./InterestForYou";

const PagesForYouForBar = () => {
    return (
        <Card className=" rounded-4 border-1  border-light-subtle">
            <Card.Body className="p-4">
                <InterestForYou
                    title="INPS_Official"
                    subtitle="Pubblica amministrazione"
                    imgSrc="/advertising/inps_official_logo.jpg"
                    targetSrc="/"
                    follower="583.571"
                    onClick={() => console.log("segui INPS_Official")}
                />

                <hr className="mb-4 mt-3 text-body-tertiary" />

                <InterestForYou
                    title="Poste Italiane"
                    imgSrc="/advertising/poste_italiane_logo.jpg"
                    targetSrc="/"
                    subtitle="Trasporti, logistica"
                    follower="583.571"
                    onClick={() => console.log("segui Poste Italiane")}
                />
            </Card.Body>
            <hr className="mb-4 mt-3 text-body-tertiary" />
        </Card>
    );
};

export default PagesForYouForBar;
