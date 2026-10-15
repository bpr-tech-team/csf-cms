import React from "react";
import { cleanup, render } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";

vi.mock("@/blocks/Code/Component", () => ({ CodeBlock: () => null }));

import RichText from "./index";

afterEach(cleanup);

it("exposes the animation target on the rich text container and renders list labels as strong text", () => {
    const { container } = render(
        <RichText
            contentListLabels
            data-reveal="text"
            enableGutter={false}
            typography={false}
            data={{
                root: {
                    type: "root",
                    version: 1,
                    direction: "ltr",
                    format: "",
                    indent: 0,
                    children: [
                        {
                            type: "list",
                            version: 1,
                            tag: "ul",
                            listType: "bullet",
                            start: 1,
                            direction: "ltr",
                            format: "",
                            indent: 0,
                            children: [
                                {
                                    type: "listitem",
                                    version: 1,
                                    checked: undefined,
                                    value: 1,
                                    direction: "ltr",
                                    format: "",
                                    indent: 0,
                                    children: [
                                        {
                                            type: "text",
                                            version: 1,
                                            text: "Support: always available",
                                            format: 0,
                                            detail: 0,
                                            mode: "normal",
                                            style: "",
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            }}
        />,
    );
    const target = container.querySelector('[data-reveal="text"]');
    expect(target?.classList.contains("payload-richtext")).toBe(true);
    expect(target?.querySelectorAll(":scope > ul > li")).toHaveLength(1);
    expect(target?.querySelector("li strong")?.textContent).toBe("Support");
    expect(target?.querySelector("li")?.textContent).toBe(
        "Support: always available",
    );
});
