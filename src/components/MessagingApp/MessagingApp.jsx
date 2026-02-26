import { Button, Card } from "react-bootstrap"
import MyFooter from "../MyFooter"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import getMData from "./getMData"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import postMData from "./postMData"
import deleteMData from "./deleteMData"

const MessagingApp = () => {
  const [actualUser, setActualUser] = useState(undefined)
  const [arrayOfUsers, setArrayOfUsers] = useState([]) // ✅ MODIFICA 1: array vuoto invece di undefined
  const [messages, setMessages] = useState([])
  const [msgText, setMsgText] = useState("")
  const [recipient, setRecipient] = useState("")
  const [countSend, setCountSend] = useState(0)
  const [countDelete, setCountDelete] = useState(0)

  useEffect(() => {
    getMData(
      "https://striveschool-api.herokuapp.com/api/profile/me",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTljMTA5NTBiYzFkZTAwMTU3N2I3OWMiLCJpYXQiOjE3NzE4MzY1NTEsImV4cCI6MTc3MzA0NjE1MX0.pFUJj7PHnqKwXxAdWF6BXDIKMzUUG8GS7tsvdUNOY8o",
      setActualUser,
    )
  }, [])

  useEffect(() => {
    getMData(
      "https://striveschool-api.herokuapp.com/api/profile/",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTljMTA5NTBiYzFkZTAwMTU3N2I3OWMiLCJpYXQiOjE3NzE4MzY1NTEsImV4cCI6MTc3MzA0NjE1MX0.pFUJj7PHnqKwXxAdWF6BXDIKMzUUG8GS7tsvdUNOY8o",
      setArrayOfUsers,
    )
  }, [])

  useEffect(() => {
    if (!actualUser?._id) return // ✅ MODIFICA 2: evita fetch con suMs-undefined

    getMData(
      `https://striveschool-api.herokuapp.com/api/comments/suMs-${actualUser._id}`,
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTlmMGY1ZTJjNGI4YjAwMTUxYWI3M2YiLCJpYXQiOjE3NzIwMzE4MzgsImV4cCI6MTc3MzI0MTQzOH0.l9U_g1ZCFlRRTQM7Pg-YqxB36BgPXx0coNHgRdxDpPg",
      setMessages,
    )
  }, [actualUser, countSend, countDelete])

  // ✅ MODIFICA 3: piccolo loading per evitare crash al primo render
  if (!actualUser || !arrayOfUsers.length) {
    return (
      <div>
        <Card className=" rounded-4 border-1 border-light-subtle my-3 mx-auto" style={{ maxWidth: "782px" }}>
          <Card.Body className="p-4">
            <h4 className="text-center">Messaggi</h4>
            <div className="text-center mt-3">Caricamento...</div>
          </Card.Body>
        </Card>
        <MyFooter />
      </div>
    )
  }

  return (
    <div>
      <Card className=" rounded-4 border-1  border-light-subtle my-3 mx-auto" style={{ maxWidth: "782px" }}>
        <Card.Body className="p-4">
          <div className="">
            <div className="flex-grow-1 px-3">
              <h4 className="text-center">Messaggi</h4>
              <div>
                <Card className="p-3">
                  <Form
                    className=""
                    onSubmit={(e) => {
                      e.preventDefault()

                      const actualData = {
                        sender: actualUser._id,
                        recipient: recipient,
                        timestamp: new Date(),
                        body: msgText,
                      }

                      const comment = JSON.stringify(actualData)

                      const dataToSend = {
                        comment: comment,
                        rate: "1",
                        elementId: `suMs-${actualUser._id}`,
                      }

                      const dataToReceive = {
                        comment: comment,
                        rate: "2",
                        elementId: `suMs-${recipient}`,
                      }

                      postMData(
                        `https://striveschool-api.herokuapp.com/api/comments/`,
                        dataToSend,
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTlmMGY1ZTJjNGI4YjAwMTUxYWI3M2YiLCJpYXQiOjE3NzIwMzE4MzgsImV4cCI6MTc3MzI0MTQzOH0.l9U_g1ZCFlRRTQM7Pg-YqxB36BgPXx0coNHgRdxDpPg",
                      )
                      postMData(
                        `https://striveschool-api.herokuapp.com/api/comments/`,
                        dataToReceive,
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTlmMGY1ZTJjNGI4YjAwMTUxYWI3M2YiLCJpYXQiOjE3NzIwMzE4MzgsImV4cCI6MTc3MzI0MTQzOH0.l9U_g1ZCFlRRTQM7Pg-YqxB36BgPXx0coNHgRdxDpPg",
                      )

                      setCountSend(countSend + 1)
                      setRecipient("")
                      setMsgText("")
                    }}
                  >
                    Invia a:
                    <Form.Select
                      aria-label="Default select example"
                      className="mb-3"
                      required
                      value={recipient}
                      onChange={(e) => {
                        setRecipient(e.target.value)
                      }}
                    >
                      <option>Scegli a chi inviare</option>

                      {arrayOfUsers?.toReversed().map((user) => {
                        return (
                          <option value={user._id} key={user._id}>
                            {user.name} {user.surname} - {user.email}
                          </option>
                        )
                      })}
                    </Form.Select>
                    Inserisci il testo del messaggio:
                    <InputGroup>
                      <Form.Control
                        as="textarea"
                        aria-label="testo-del-messaggio"
                        required
                        value={msgText}
                        onChange={(e) => {
                          setMsgText(e.target.value)
                        }}
                      />
                    </InputGroup>
                    <Button className="w-100 mt-2" type="submit">
                      Submit
                    </Button>
                  </Form>
                </Card>
              </div>
            </div>
            <div className="p-3" style={{}}>
              <h4 className="text-center">Inbox</h4>
              {messages.length === 0 && (
                <Card>
                  <Card.Body>
                    <Card.Text>Nessun messaggio per l'utente</Card.Text>
                  </Card.Body>
                </Card>
              )}
              {messages?.toReversed().map((mes) => {
                const mess = JSON.parse(mes.comment)
                // console.log(mess);
                const thisSender = arrayOfUsers.filter((user) => user?._id === mess.sender)
                const thisRecipient = arrayOfUsers.filter((user) => user?._id === mess.recipient)

                const sendDate = new Date(mess.timestamp).toLocaleString("it-IT")
                // console.log(sendDate);

                return (
                  <Card className="mb-1" key={mes._id}>
                    <Card.Body className="btn-light bg-transparent d-flex">
                      <div className="w-25 me-3 border-end">
                        <Card.Title className="fs-6 mb-0 text-center">
                          <div>
                            <div className="fw-normal text-center"> Inviato da</div>
                            <div className="text-success">{thisSender[0].name + " " + thisSender[0].surname}</div>
                          </div>
                          <div>
                            <div className="fw-normal text-center"> A</div>
                            <div className="text-primary">{thisRecipient[0].name + " " + thisRecipient[0].surname}</div>
                          </div>
                        </Card.Title>
                        <Card.Text className="fs-6">{sendDate}</Card.Text>
                      </div>
                      <div>
                        {" "}
                        <Card.Text>{mess.body}</Card.Text>
                      </div>
                    </Card.Body>
                    <Button
                      className="ms-auto me-3 mb-2"
                      style={{ width: "fit-content" }}
                      onClick={() => {
                        deleteMData(
                          `https://striveschool-api.herokuapp.com/api/comments/${mes._id}`,
                          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTlmMGY1ZTJjNGI4YjAwMTUxYWI3M2YiLCJpYXQiOjE3NzIwMzE4MzgsImV4cCI6MTc3MzI0MTQzOH0.l9U_g1ZCFlRRTQM7Pg-YqxB36BgPXx0coNHgRdxDpPg",
                        )
                        setCountDelete(countDelete + 1)
                      }}
                      variant="warning"
                    >
                      Elimina
                    </Button>
                  </Card>
                )
              })}
            </div>
          </div>
        </Card.Body>
      </Card>
      <MyFooter />
    </div>
  )
}

export default MessagingApp
