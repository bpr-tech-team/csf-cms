import { Banner } from "@payloadcms/ui/elements/Banner";
import React from "react";

import { SeedButton } from "./SeedButton";
import "./index.scss";

const baseClass = "before-dashboard";

const BeforeDashboard: React.FC = () => {
    return (
        <div className={baseClass}>
            <Banner className={`${baseClass}__banner`} type="success">
                <h4>Vítejte v administraci!</h4>
            </Banner>
            Doporučené další kroky:
            <ul className={`${baseClass}__instructions`}>
                <li>
                    <SeedButton />
                    {" ukázkovým obsahem pro rychlý start nového webu, potom "}
                    <a href="/" target="_blank">
                        otevřete web
                    </a>
                    {" a zkontrolujte výsledek."}
                </li>
                <li>
                    {"Upravte "}
                    <a
                        href="https://payloadcms.com/docs/configuration/collections"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        kolekce
                    </a>
                    {" a podle potřeby přidejte další "}
                    <a
                        href="https://payloadcms.com/docs/fields/overview"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        pole
                    </a>
                    {". Pokud s Payload začínáte, doporučujeme také projít "}
                    <a
                        href="https://payloadcms.com/docs/getting-started/what-is-payload"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        úvodní dokumentaci
                    </a>
                    {"."}
                </li>
                <li>
                    Commitněte a pushněte změny do repozitáře, aby se spustil
                    nový deployment projektu.
                </li>
            </ul>
            {"Tip: Tento blok je "}
            <a
                href="https://payloadcms.com/docs/custom-components/overview"
                rel="noopener noreferrer"
                target="_blank"
            >
                vlastní komponenta
            </a>
            , kterou můžete kdykoliv odebrat úpravou{" "}
            <strong>payload.config</strong>.
        </div>
    );
};

export default BeforeDashboard;
