import { SlideBookCall } from "@/components";

export const meta = { title: "Thank you" };

/** Starter closing slide — swap in the real contact (a `photo` only with that person's own portrait).
 *  Other closings: SlideClosing, SlideStatement; see src/components/CATALOG.md. */
export default function Thanks() {
  return (
    <SlideBookCall
      eyebrow="NEXT STEP"
      title="Thank you!"
      accent="Let’s talk"
      text="Questions, ideas or a project in mind: write to us and we’ll set up a call."
      email="contact@vintasoftware.com"
      contact={{
        name: "Your name",
        role: "Your role",
        email: "you@vintasoftware.com",
      }}
    />
  );
}
