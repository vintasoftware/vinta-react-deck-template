import { Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 08" };

// Faithful reproduction of the official template's Slide 08.
export default function Slide08() {
  return (
    <Slide bg="white" pad={false}>
      <Place x={946} y={0} w={974} h={648.08}><Photo src="img-85046c0194.png" /></Place>
      <Place x={946} y={484.91} w={974} h={595.1}><Photo src="img-57a4f6c3e8.png" /></Place>
      <Place x={101} y={236.4} w={1011.45} h={632.71}><Photo src="img-7c58504e37.png" inner={{ x: -101.03, y: -236.37, w: 1813.9, h: 1079.95 }} /></Place>
      <Place x={101} y={126.4}>
        <Text size={71} weight={700} color="#0052FF" leading={1.14} maxWidth={555}>{"Insira o texto"}</Text>
      </Place>
      <Place x={1173} y={373.2}>
        <Text size={44.6} weight={700} color="#FFFFFF" leading={1.14} maxWidth={352}>{"Insira o texto"}</Text>
      </Place>
      <Place x={1173} y={460}>
        <Text size={30.1} weight={700} color="#FFFFFF" leading={1.32} maxWidth={647}>{"Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit. Etiam nec\nsuscipit du sed cursus nibh id risus\nultrices convallis phasellus vel tristique\ndiamp nam placerat aliqu."}</Text>
      </Place>
    </Slide>
  );
}
