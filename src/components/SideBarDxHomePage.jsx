import React, { useEffect, useState } from "react";
import HomeFooter from "./HomeFooter";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Spinner from "react-bootstrap/Spinner";

const getNews = (url, setData) => {
    fetch(url, {
        // headers: {
        //     Authorization: `${auth}`,
        // },
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(
                    `error in the first .then (GET): ${res.status} - ${res.statusText}`,
                );
            }
        })
        .then((res) => {
            setData(res.items);
            // console.log(res);
        })
        .catch((e) => {
            console.log(
                `Error communicating with the server, please try again. Error: ${e}`,
            );
        });
};

export default function SideBarDxHomePage() {
    const [news, setNews] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getNews(
            "https://api.rss2json.com/v1/api.json?rss_url=https://news.google.com/rss/headlines/section/topic/BUSINESS?hl=it&gl=IT&ceid=IT:it",
            setNews,
        );
    }, []);

    // const news = [
    //   {
    //     id: 1,
    //     title: "Usa: dazi al 15% per tutti",
    //     meta: "8h fa • 514 lettori",
    //   },
    //   {
    //     id: 2,
    //     title: 'Milano Cortina "ha definito un nuovo ..."',
    //     meta: "3h fa • 166 lettori",
    //   },
    //   {
    //     id: 3,
    //     title: "Più investimenti per gli alberghi italiani",
    //     meta: "3 giorni fa • 157 lettori",
    //   },
    //   {
    //     id: 4,
    //     title: "Unipol distribuiti ai soci 804 milioni",
    //     meta: "3 giorni fa • 106 lettori",
    //   },
    //   {
    //     id: 5,
    //     title: "Cosa ci lascerà Milano Cortina",
    //     meta: "2h fa • 8365 lettori",
    //   },
    // ];

    return (
        <aside className="d-flex flex-column gap-2">
            <div className="card shadow-sm">
                <div className="card-body pb-2">
                    <div className="d-flex align-items-start justify-content-between">
                        <div>
                            <div className="fw-bold">LinkedIn Notizie</div>
                            <div className="text-muted small">
                                Storie principali
                            </div>
                        </div>
                        <span className="text-muted" style={{ fontSize: 12 }}>
                            i
                        </span>
                    </div>
                </div>

                {news.length === 0 ? (
                    <div className="text-center">
                        <Spinner animation="grow" />
                    </div>
                ) : (
                    ""
                )}

                <ul className="list-unstyled m-0 px-3 pb-2">
                    {news.slice(0, 5).map((n) => (
                        <li key={n.guid} className="py-2">
                            <a
                                href={n.link}
                                target="_blank"
                                className="text-decoration-none text-dark d-flex gap-2">
                                <span
                                    style={{
                                        width: 6,
                                        height: 6,
                                        backgroundColor: "#111",
                                        borderRadius: "50%",
                                        marginTop: 6,
                                        flex: "0 0 auto",
                                    }}
                                    aria-hidden="true"
                                />
                                <div className="overflow-hidden">
                                    <div
                                        className="fw-semibold small w-100 text-truncate"
                                        style={{ lineHeight: 1.2 }}>
                                        {n.title}
                                    </div>
                                    <div
                                        className="text-muted"
                                        style={{ fontSize: 12 }}>
                                        {Math.round(
                                            (new Date() - new Date(n.pubDate)) /
                                                (1000 * 60 * 60),
                                        ) < 23
                                            ? Math.round(
                                                  (new Date() -
                                                      new Date(n.pubDate)) /
                                                      (1000 * 60 * 60),
                                              ) + " ore fa"
                                            : Math.round(
                                                    (new Date() -
                                                        new Date(n.pubDate)) /
                                                        (1000 * 60 * 60 * 24),
                                                ) === 1
                                              ? Math.round(
                                                    (new Date() -
                                                        new Date(n.pubDate)) /
                                                        (1000 * 60 * 60 * 24),
                                                ) + " giorno fa"
                                              : Math.round(
                                                    (new Date() -
                                                        new Date(n.pubDate)) /
                                                        (1000 * 60 * 60 * 24),
                                                ) + " giorni fa"}
                                    </div>
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>

                {!open && (
                    <Button
                        onClick={() => setOpen(!open)}
                        aria-controls="collapse-left-bar"
                        aria-expanded={open}
                        className="btn btn-link p-0 text-muted fw-semibold small text-decoration-none text-start mx-3 px-1 bethover"
                        style={{ width: "fit-content" }}>
                        Mostra altro{" "}
                        <svg
                            style={{ width: "16px", height: "16px" }}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            id="chevron-down-small"
                            aria-hidden="true"
                            role="none"
                            data-supported-dps="16x16"
                            fill="currentColor">
                            <path d="M1 5l7 4.61L15 5v2.39L8 12 1 7.39z"></path>
                        </svg>
                    </Button>
                )}
                <Collapse in={open}>
                    <div id="collapse-left-bar" className="">
                        <ul className="list-unstyled m-0 px-3 pb-2">
                            {news.slice(5, 10).map((n) => (
                                <li key={n.guid} className="py-2">
                                    <a
                                        href={n.link}
                                        target="_blank"
                                        className="text-decoration-none text-dark d-flex gap-2">
                                        <span
                                            style={{
                                                width: 6,
                                                height: 6,
                                                backgroundColor: "#111",
                                                borderRadius: "50%",
                                                marginTop: 6,
                                                flex: "0 0 auto",
                                            }}
                                            aria-hidden="true"
                                        />
                                        <div className="overflow-hidden">
                                            <div
                                                className="fw-semibold small w-100 text-truncate"
                                                style={{ lineHeight: 1.2 }}>
                                                {n.title}
                                            </div>
                                            <div
                                                className="text-muted"
                                                style={{ fontSize: 12 }}>
                                                {Math.round(
                                                    (new Date() -
                                                        new Date(n.pubDate)) /
                                                        (1000 * 60 * 60),
                                                ) < 23
                                                    ? Math.round(
                                                          (new Date() -
                                                              new Date(
                                                                  n.pubDate,
                                                              )) /
                                                              (1000 * 60 * 60),
                                                      ) + " ore fa"
                                                    : Math.round(
                                                            (new Date() -
                                                                new Date(
                                                                    n.pubDate,
                                                                )) /
                                                                (1000 *
                                                                    60 *
                                                                    60 *
                                                                    24),
                                                        ) === 1
                                                      ? Math.round(
                                                            (new Date() -
                                                                new Date(
                                                                    n.pubDate,
                                                                )) /
                                                                (1000 *
                                                                    60 *
                                                                    60 *
                                                                    24),
                                                        ) + " giorno fa"
                                                      : Math.round(
                                                            (new Date() -
                                                                new Date(
                                                                    n.pubDate,
                                                                )) /
                                                                (1000 *
                                                                    60 *
                                                                    60 *
                                                                    24),
                                                        ) + " giorni fa"}
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Collapse>
                {open && (
                    <Button
                        onClick={() => setOpen(!open)}
                        aria-controls="collapse-left-bar"
                        aria-expanded={open}
                        className="btn btn-link p-0 text-muted fw-semibold small text-decoration-none text-start mx-3 px-1 bethover"
                        style={{ width: "fit-content" }}>
                        Meno dettagli{" "}
                        <svg
                            style={{ width: "16px", height: "16px" }}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            id="chevron-up-small"
                            aria-hidden="true"
                            role="none"
                            data-supported-dps="16x16"
                            fill="currentColor">
                            <path d="M15 11L8 6.39 1 11V8.61L8 4l7 4.61z"></path>
                        </svg>
                    </Button>
                )}

                <div className="px-3 pb-3"></div>
            </div>

            <div className="card shadow-sm overflow-hidden">
                <div className="p-3" style={{ background: "#0B2F48" }}>
                    <div className="text-white small fw-bold mb-2">
                        LinkedIn
                    </div>
                    <div
                        className="text-white fw-bold"
                        style={{ lineHeight: 1.2 }}>
                        Your job search powered by your network
                    </div>

                    <button className="btn btn-primary btn-sm mt-2">
                        Explore jobs
                    </button>

                    <div className="mt-3 rounded overflow-hidden">
                        <img
                            src="public/advertising/imgsidebardx.png"
                            alt=""
                            className="w-100"
                            style={{
                                height: 120,
                                objectFit: "cover",
                                display: "block",
                            }}
                        />
                    </div>
                </div>
            </div>

            <HomeFooter />
        </aside>
    );
}
