import { Photo, Place, Shape, Slide, Text } from "@/lib";

export const meta = { title: "Slide 25" };

export interface Slide25Props {
  /** Centered heading (black). */
  title?: string;
  /** Large content image src (the slide's subject). */
  image?: string;
}

// Parametrized reproduction of the official template's Slide 25 (image showcase).
export default function Slide25({
  title = "Insert text here",
  image = "img-424490bc08.png",
}: Slide25Props = {}) {
  return (
    <Slide bg="white" pad={false}>
      <Place x={344.71} y={206.25} w={1230.59} h={760.91}><Photo src={image} /></Place>
      <Place x={110.85} y={0} w={112.64} h={112.16}><Shape n={16} fit="cover" /></Place>
      <Place x={-1.76} y={0} w={112.9} h={112}><Shape n={22} fit="cover" /></Place>
      <Place x={-1.8} y={111.75} w={112.41} h={112.9}><Shape n={23} fit="cover" /></Place>
      <Place x={0} y={1006.43} w={747.66} h={73.58}><Photo src="img-e724e6a599.png" inner={{ x: 0, y: -344.66, w: 821.15, h: 461.86 }} /></Place>
      <Place x={742.99} y={1006.43} w={373.84} h={73.58}><Photo src="img-e724e6a599.png" inner={{ x: 0, y: -344.66, w: 821.17, h: 461.86 }} /></Place>
      <Place x={1108.83} y={1006.43} w={747.66} h={73.58}><Photo src="img-e724e6a599.png" inner={{ x: 0, y: -344.66, w: 821.15, h: 461.86 }} /></Place>
      <Place x={1851.82} y={1006.43} w={68.18} h={73.58}><Photo src="img-e724e6a599.png" inner={{ x: 0, y: -344.66, w: 821.1, h: 461.86 }} /></Place>
      <Place x={0} y={92.4} w={1920}>
        <Text size={71} weight={700} color="#000000" align="center" leading={1.14}>{title}</Text>
      </Place>
    </Slide>
  );
}
