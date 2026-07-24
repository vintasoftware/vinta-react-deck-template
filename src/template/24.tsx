import { Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 24" };

export interface Slide24Props {
  /** Heading on the left (black). Use `\n` for line breaks. */
  title?: string;
  /** Up to 3 percentage labels on the donut chart. Extra items are ignored. */
  values?: string[];
  /** Up to 3 legend labels on the left. Extra items are ignored. */
  legend?: string[];
}

/** Fixed donut label slots — position + color, preserved from the original. */
const VALUE_POS = [
  { x: 1042.3, y: 450.4, color: "#000000" },
  { x: 1367.5, y: 450.4, color: "#FFFFFF" },
  { x: 1202.4, y: 720, color: "#FFFFFF" },
];

/** Fixed legend slots — position, preserved from the original. */
const LEGEND_POS = [
  { x: 338.4, y: 489.6 },
  { x: 338.4, y: 568.6 },
  { x: 338.4, y: 647.6 },
];

// Parametrized reproduction of the official template's Slide 24 (donut chart).
export default function Slide24({
  title = "Insert text\nhere",
  values = ["00%", "00%", "00%"],
  legend = ["Insert text here", "Insert text here", "Insert text here"],
}: Slide24Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={1560.77} y={-2.25} w={359.23} h={358.89}><Photo src="img-12269fea93.png" inner={{ x: -1560.75, y: 0, w: 1919.97, h: 1079.99 }} /></Place>
      <Place x={0} y={-2.25} w={359.23} h={358.89}><Photo src="img-12269fea93.png" inner={{ x: 0, y: -20.84, w: 1919.97, h: 1079.95 }} /></Place>
      <Place x={0} y={700.25} w={359.23} h={379.75}><Photo src="img-12269fea93.png" inner={{ x: 0, y: -593.63, w: 1919.97, h: 1079.96 }} /></Place>
      <Place x={281.35} y={248.64} w={490} h={427}><Photo src="img-65fec17bae.png" /></Place>
      <Place x={719.12} y={225.95} w={1099.9} h={680.1}><Photo src="img-ca99edf3cb.png" /></Place>
      <Place x={276.4} y={237.1}>
        <Text size={71} weight={700} color="#000000" leading={1.14} maxWidth={487}>{title}</Text>
      </Place>
      {values.slice(0, 3).map((v, i) => (
        <Place key={i} x={VALUE_POS[i].x} y={VALUE_POS[i].y}>
          <Text size={53.8} weight={700} color={VALUE_POS[i].color} leading={1.14} maxWidth={200}>{v}</Text>
        </Place>
      ))}
      {legend.slice(0, 3).map((l, i) => (
        <Place key={i} x={LEGEND_POS[i].x} y={LEGEND_POS[i].y}>
          <Text size={24.2} weight={500} color="#000000" leading={1.32} maxWidth={261}>{l}</Text>
        </Place>
      ))}
    </Slide>
  );
}
