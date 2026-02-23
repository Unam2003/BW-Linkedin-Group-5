import { Button, Card } from "react-bootstrap";
import PersonForYou from "./PersonForYou";
import { ArrowRight } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import getData from "./getData";

const PeopleYouMayKnow = () => {
    const [users, setUsers] = useState(undefined);

    useEffect(() => {
        getData(
            "https://striveschool-api.herokuapp.com/api/profile/",
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTljMTA5NTBiYzFkZTAwMTU3N2I3OWMiLCJpYXQiOjE3NzE4MzY1NTEsImV4cCI6MTc3MzA0NjE1MX0.pFUJj7PHnqKwXxAdWF6BXDIKMzUUG8GS7tsvdUNOY8o",
            setUsers,
        );
    }, []);

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
                    {users &&
                        users.slice(-5).map((user) => {
                            return (
                                <PersonForYou
                                    key={user._id}
                                    name={user.name}
                                    title={user.title}
                                    image={user.image}
                                    targetSrc="/"
                                    onClick={() =>
                                        console.log("invia messaggio")
                                    }
                                />
                            );
                        })}
                </div>
            </Card.Body>
            <hr className="m-0 text-body-tertiary" />
            <Button
                variant="link"
                className="fw-semibold w-100 py-2 text-decoration-none d-flex justify-content-center align-items-center gap-2 border-top text-black"
                onClick={() => console.log("mostra tutto")}>
                Mostra tutto <ArrowRight />
            </Button>
        </Card>
    );
};
export default PeopleYouMayKnow;
