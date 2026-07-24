import { Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 23" };

export interface Slide23Props {
  /** Heading on the right (black). Use `\n` for line breaks. */
  title?: string;
  /** Paragraph under the title (black). Use `\n` for line breaks. */
  body?: string;
  /** Up to 4 value labels on the funnel, top to bottom (white). Extra items are ignored. */
  values?: string[];
}

/** Fixed funnel label slots — position + width, preserved from the original. */
const VALUE_POS = [
  { x: 580, y: 351.5, max: 205 },
  { x: 388.7, y: 483.3, max: 200 },
  { x: 321.5, y: 622.3, max: 200 },
  { x: 207.3, y: 749.1, max: 200 },
];

// Parametrized reproduction of the official template's Slide 23 (funnel diagram).
export default function Slide23({
  title = "Insert text\nhere",
  body = "Lectus enim adipiscing suspendisse\nviverra cras facilisi blandit scelerisque\nfacilisis vel porta quisque cursus\nvulputate gravida interdum mollis ac\nvarius consectetu.",
  values = ["$100,000 USD", "$64,000 USD", "$48,000 USD", "$25,000 USD"],
}: Slide23Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={130.07} h={132.78}><Photo src="img-c2ae468178.png" /></Place>
      <Place x={94.61} y={239.23} w={1109.63} h={686.11}><Photo src="img-d39c35de48.png" /></Place>
      <Place x={1691.95} y={0} w={114.09} h={113.46}><Photo src="img-6866879b7e.png" /></Place>
      <Place x={1805.65} y={0.05} w={114.33} h={113.32}><Photo src="img-54d336f9bc.png" /></Place>
      <Place x={1805.65} y={113.38} w={114.35} h={113.74}><Photo src="img-a8a2646f09.png" /></Place>
      <Place x={1578.07} y={0} w={114.01} h={113.49}><Photo src="img-8f485ac52f.png" /></Place>
      <Place x={1314} y={338.2}>
        <Text size={71} weight={700} color="#000000" leading={1.14} maxWidth={487}>{title}</Text>
      </Place>
      <Place x={1314} y={564.2}>
        <Text size={24.2} weight={500} color="#000000" leading={1.32} maxWidth={510}>{body}</Text>
      </Place>
      {values.slice(0, 4).map((v, i) => (
        <Place key={i} x={VALUE_POS[i].x} y={VALUE_POS[i].y}>
          <Text size={24.2} weight={500} color="#FFFFFF" leading={1.32} maxWidth={VALUE_POS[i].max}>{v}</Text>
        </Place>
      ))}
    </Slide>
  );
}
