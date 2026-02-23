import { Card } from "react-bootstrap";
import SettingCard from "./SettingCard";

const SettingCards = () => {
    return (
        <Card className=" rounded-4 border-1  border-light-subtle">
            <Card.Body className="p-4">
                <SettingCard
                    title="Lingua del profilo"
                    value="Italiano"
                    onEdit={() => console.log("edit lingua")}
                />

                <hr className="mb-4 mt-3 text-body-tertiary" />

                <SettingCard
                    title="Profilo pubblico e URL"
                    value="www.linkedin.com/in/samuel-valentini"
                    onEdit={() => console.log("edit url")}
                />
            </Card.Body>
        </Card>
    );
};

export default SettingCards;
