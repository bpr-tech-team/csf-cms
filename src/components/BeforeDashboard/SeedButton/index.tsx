"use client";

import React, { Fragment, useCallback, useState } from "react";
import { toast } from "@payloadcms/ui";

import "./index.scss";

const SuccessMessage: React.FC = () => (
    <div>
        Databáze byla naplněna. Nyní můžete{" "}
        <a target="_blank" href="/">
            otevřít web
        </a>
    </div>
);

export const SeedButton: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [seeded, setSeeded] = useState(false);
    const [error, setError] = useState<null | string>(null);

    const handleClick = useCallback(
        async (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();

            if (seeded) {
                toast.info("Databáze už byla naplněna.");
                return;
            }
            if (loading) {
                toast.info("Naplnění databáze už probíhá.");
                return;
            }
            if (error) {
                toast.error(
                    "Došlo k chybě, obnovte prosím stránku a zkuste to znovu.",
                );
                return;
            }

            setLoading(true);

            try {
                toast.promise(
                    new Promise((resolve, reject) => {
                        try {
                            fetch("/next/seed", {
                                method: "POST",
                                credentials: "include",
                            })
                                .then((res) => {
                                    if (res.ok) {
                                        resolve(true);
                                        setSeeded(true);
                                    } else {
                                        reject(
                                            "Došlo k chybě při naplňování databáze.",
                                        );
                                    }
                                })
                                .catch((error) => {
                                    reject(error);
                                });
                        } catch (error) {
                            reject(error);
                        }
                    }),
                    {
                        loading: "Probíhá naplňování databáze...",
                        success: <SuccessMessage />,
                        error: "Došlo k chybě při naplňování databáze.",
                    },
                );
            } catch (err) {
                const error = err instanceof Error ? err.message : String(err);
                setError(error);
            }
        },
        [loading, seeded, error],
    );

    let message = "";
    if (loading) message = " (probíhá...)";
    if (seeded) message = " (hotovo)";
    if (error) message = ` (chyba: ${error})`;

    return (
        <Fragment>
            <button className="seedButton" onClick={handleClick}>
                Naplnit databázi
            </button>
            {message}
        </Fragment>
    );
};
