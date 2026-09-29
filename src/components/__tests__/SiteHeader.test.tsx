import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SiteHeader } from "../SiteHeader";

describe("SiteHeader mobile menu", () => {
  it("toggles the menu and closes it with Escape", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    const button = screen.getByRole("button", { name: /Menü/ });
    const panel = document.getElementById(button.getAttribute("aria-controls")!)!;
    expect(panel).not.toBeVisible();

    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(panel).toBeVisible();

    await user.keyboard("{Escape}");
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(panel).not.toBeVisible();
    expect(button).toHaveFocus();
  });

  it("closes the menu when a link is chosen", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);
    const button = screen.getByRole("button", { name: /Menü/ });
    await user.click(button);

    const panel = document.getElementById(button.getAttribute("aria-controls")!)!;
    const link = [...panel.querySelectorAll("a")].find((a) => a.textContent === "Kontakt")!;
    link.addEventListener("click", (e) => e.preventDefault());
    await user.click(link);
    expect(button).toHaveAttribute("aria-expanded", "false");
  });
});
