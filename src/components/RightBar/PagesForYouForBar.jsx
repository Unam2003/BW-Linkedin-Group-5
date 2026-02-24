import { Button, Card } from "react-bootstrap";
import InterestForYou from "./InterestForYou";
import { ArrowRight } from "react-bootstrap-icons";

const PagesForYouForBar = () => {
    return (
        <Card className=" rounded-4 border-1  border-light-subtle">
            <Card.Body className="pt-4 pb-0">
                <h6 className="m-0">Potrebbero interessarti</h6>
                <span
                    className="text-body-tertiary"
                    style={{ fontSize: "0.9rem" }}>
                    Pagine per te
                </span>
                <div className="pt-3">
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
                        subtitle="Trasporti, logistica, supply chain e stoccaggio"
                        follower="583.571"
                        onClick={() => console.log("segui Poste Italiane")}
                    />
                </div>
            </Card.Body>
            <hr className="m-0 mt-3 text-body-tertiary" />
            <Button
                variant="link"
                className="fw-semibold w-100 py-2 text-decoration-none d-flex justify-content-center align-items-center gap-2 border-top text-black"
                onClick={() => console.log("mostra tutto")}>
                Mostra tutto <ArrowRight />
            </Button>
        </Card>
    );
};

export default PagesForYouForBar;
