import { Photo, Place, Slide, Text } from "@/lib";
import { Fragment } from "react";

export const meta = { title: "Slide 26" };

export interface Slide26Panel {
  /** Big number on the panel (white), e.g. "10M". */
  stat: string;
  /** Short heading under the number (white). */
  title: string;
  /** Caption under the heading (white). Use `\n` for line breaks. */
  caption: string;
  /** Optional panel photo src. Falls back to the slot's default. */
  photo?: string;
}

export interface Slide26Props {
  /** Up to 3 panels (stat + title + caption + photo). Extra items are ignored. */
  panels?: Slide26Panel[];
}

/** Fixed 3-panel slots — photo box, stat x, and text-column x, preserved from the original. */
const PANEL_POS = [
  { photo: { src: "img-a82a2279c5.png", x: -104.55, y: 126.37, w: 900, h: 556.5 }, statX: 280.6, textX: 95.4 },
  { photo: { src: "img-25a6cedeec.png", x: 503.29, y: 126.37, w: 900, h: 556.5 }, statX: 895.2, textX: 710 },
  { photo: { src: "img-a82a2279c5.png", x: 1112.01, y: 126.37, w: 900, h: 556.5 }, statX: 1496.3, textX: 1311.1 },
];

// Parametrized reproduction of the official template's Slide 26 (3-panel stats).
export default function Slide26({
  panels = [
    { stat: "10M", title: "Insert text here", caption: "Lectus enim adipiscing suspendisse\nviverra cras facilisi blandit celolr\nscelerisque facilisis" },
    { stat: "10M", title: "Insert text here", caption: "Lectus enim adipiscing suspendisse\nviverra cras facilisi blandit celolr\nscelerisque facilisis" },
    { stat: "10M", title: "Insert text here", caption: "Lectus enim adipiscing suspendisse\nviverra cras facilisi blandit celolr\nscelerisque facilisis" },
  ],
}: Slide26Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={1920} h={1080}><Photo src="img-34260598bb.png" /></Place>
      <Place x={0} y={1006.43} w={747.66} h={73.58}><Photo src="img-e724e6a599.png" inner={{ x: 0, y: -344.66, w: 821.15, h: 461.86 }} /></Place>
      <Place x={742.99} y={1006.43} w={373.84} h={73.58}><Photo src="img-e724e6a599.png" inner={{ x: 0, y: -344.66, w: 821.17, h: 461.86 }} /></Place>
      <Place x={1108.83} y={1006.43} w={747.66} h={73.58}><Photo src="img-e724e6a599.png" inner={{ x: 0, y: -344.66, w: 821.15, h: 461.86 }} /></Place>
      <Place x={1851.82} y={1006.43} w={68.18} h={73.58}><Photo src="img-e724e6a599.png" inner={{ x: 0, y: -344.66, w: 821.1, h: 461.86 }} /></Place>
      {panels.slice(0, 3).map((p, i) => {
        const pos = PANEL_POS[i];
        return (
          <Fragment key={i}>
            <Place x={pos.photo.x} y={pos.photo.y} w={pos.photo.w} h={pos.photo.h}><Photo src={p.photo ?? pos.photo.src} /></Place>
            <Place x={pos.statX} y={376.6}>
              <Text size={53.8} weight={700} color="#FFFFFF" leading={1.14} maxWidth={200}>{p.stat}</Text>
            </Place>
            <Place x={pos.textX} y={697.7} w={500}>
              <Text size={51.6} weight={700} color="#FFFFFF" align="center" leading={1.14}>{p.title}</Text>
            </Place>
            <Place x={pos.textX} y={792.7} w={500}>
              <Text size={24.7} weight={500} color="#FFFFFF" align="center" leading={1.32}>{p.caption}</Text>
            </Place>
          </Fragment>
        );
      })}
    </Slide>
  );
}
