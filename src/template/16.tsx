import { Place, Shape, Slide, Text } from "@/lib";

export const meta = { title: "Slide 16" };

export interface Slide16Props {
  /** Heading at the top left (blue). */
  title?: string;
  /** Up to 8 bullet items (2 columns × 4 rows). Extra items are ignored. */
  items?: string[];
}

/** Fixed slots for the bullet items, left-to-right then top-to-bottom, preserved from the original. */
const ITEM_POS = [
  { x: 158.2, y: 370.9 },
  { x: 946.4, y: 370.9 },
  { x: 158.2, y: 497.6 },
  { x: 946.4, y: 497.6 },
  { x: 158.2, y: 617.3 },
  { x: 946.4, y: 617.3 },
  { x: 158.2, y: 737 },
  { x: 946.4, y: 737 },
];

// Parametrized reproduction of the official template's Slide 16 (bulleted list).
export default function Slide16({
  title = "Texto",
  items = [
    "● Insert text here",
    "● Insert text here",
    "● Insert text here",
    "● Insert text here",
    "● Insert text here",
    "● Insert text here",
    "● Insert text here",
    "● Insert text here",
  ],
}: Slide16Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={1545.27} y={-8} w={187.12} h={186.97}><Shape n={6} fit="cover" /></Place>
      <Place x={1732.31} y={-8} w={187.51} h={186.97}><Shape n={10} fit="cover" /></Place>
      <Place x={1732.42} y={170.97} w={187.59} h={186.48}><Shape n={20} fit="cover" /></Place>
      <Place x={79.3} y={1000.75} w={0} h={0}><Shape n={2} fit="cover" /></Place>
      <Place x={79.3} y={921.62} w={0} h={0}><Shape n={13} fit="cover" /></Place>
      <Place x={158.38} y={999.87} w={0} h={0}><Shape n={21} fit="cover" /></Place>
      <Place x={158.4} y={199.4}>
        <Text size={71} weight={700} color="#0052FF" leading={1.14} maxWidth={236}>{title}</Text>
      </Place>
      {items.slice(0, 8).map((item, i) => (
        <Place key={i} x={ITEM_POS[i].x} y={ITEM_POS[i].y}>
          <Text size={32.3} weight={700} color="#000000" leading={1.32} maxWidth={372}>{item}</Text>
        </Place>
      ))}
    </Slide>
  );
}
