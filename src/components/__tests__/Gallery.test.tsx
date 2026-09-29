import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Gallery, FEATURED_COUNT } from "../Gallery";
import { holzbauPhotos } from "@/content/photos";

function openDialog() {
  return document.querySelector("dialog[open]") as HTMLDialogElement | null;
}

describe("Gallery", () => {
  it("shows the featured photos first and reveals the rest on demand", async () => {
    const user = userEvent.setup();
    render(<Gallery title="Holzbau" photos={holzbauPhotos} />);

    expect(screen.getAllByRole("button", { name: /^Foto vergrößern/ })).toHaveLength(FEATURED_COUNT);

    const toggle = screen.getByRole("button", { name: `Alle ${holzbauPhotos.length} Holzbau-Fotos zeigen` });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await user.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getAllByRole("button", { name: /^Foto vergrößern/ })).toHaveLength(holzbauPhotos.length);
  });

  it("opens the lightbox, navigates with the keyboard and closes again", async () => {
    const user = userEvent.setup();
    render(<Gallery title="Holzbau" photos={holzbauPhotos} />);

    await user.click(screen.getByRole("button", { name: `Foto vergrößern: ${holzbauPhotos[0].alt}` }));
    const dialog = openDialog();
    expect(dialog).not.toBeNull();
    const counter = () => within(dialog!).getByText(/Holzbau · \d+ \/ \d+/).textContent;
    expect(counter()).toBe(`Holzbau · 1 / ${holzbauPhotos.length}`);

    fireEvent.keyDown(dialog!, { key: "ArrowRight" });
    expect(counter()).toBe(`Holzbau · 2 / ${holzbauPhotos.length}`);
    expect(within(dialog!).getByText(holzbauPhotos[1].alt, { selector: "p" })).toBeInTheDocument();

    fireEvent.keyDown(dialog!, { key: "ArrowLeft" });
    fireEvent.keyDown(dialog!, { key: "ArrowLeft" });
    expect(counter()).toBe(`Holzbau · ${holzbauPhotos.length} / ${holzbauPhotos.length}`);

    await user.click(within(dialog!).getByRole("button", { name: /Schließen/ }));
    expect(openDialog()).toBeNull();
  });

  it("gives every photo a real alt text", () => {
    for (const photo of holzbauPhotos) expect(photo.alt.trim().length).toBeGreaterThan(3);
  });
});
