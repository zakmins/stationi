import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { I18nProvider, useI18n } from "@/i18n/context";
import { LangSwitch } from "./Top";

function LanguageLabel() {
  const { t } = useI18n();
  return <p>{t.nav.problem}</p>;
}

describe("Language switch", () => {
  beforeEach(() => {
    localStorage.removeItem("stationi-lang");
    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";
  });

  it("switches languages immediately without a confirmation dialog", () => {
    render(
      <I18nProvider>
        <LangSwitch />
        <LanguageLabel />
      </I18nProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Language: FR" }));
    fireEvent.click(screen.getByRole("menuitemradio", { name: /English/ }));

    expect(screen.getByText("Problem")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Language: EN" })).toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(localStorage.getItem("stationi-lang")).toBe("en");
  });

  it("updates document direction when switching to Arabic", () => {
    render(
      <I18nProvider>
        <LangSwitch />
        <LanguageLabel />
      </I18nProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Language: FR" }));
    fireEvent.click(screen.getByRole("menuitemradio", { name: /العربية/ }));

    expect(document.documentElement.lang).toBe("ar");
    expect(document.documentElement.dir).toBe("rtl");
  });
});
