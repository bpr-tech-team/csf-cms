import React from "react";

import { defaultTheme, themeLocalStorageKey } from "../shared";

export const InitTheme: React.FC = () => {
    return (
        // Run during HTML parsing, before CSS paints, without the Next.js runtime.
        <script
            dangerouslySetInnerHTML={{
                __html: `
  (function () {
    var themeToSet = ${JSON.stringify(defaultTheme)}
    try {
      themeToSet = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    } catch (_) {}
    try {
      var preference = window.localStorage.getItem(${JSON.stringify(themeLocalStorageKey)})
      if (preference === 'light' || preference === 'dark') themeToSet = preference
    } catch (_) {}

    document.documentElement.setAttribute('data-theme', themeToSet)
  })();
  `,
            }}
            id="theme-script"
        />
    );
};
