import { Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 30" };

// Faithful reproduction of the official template's Slide 30.
export default function Slide30() {
  return (
    <Slide bg="white" pad={false}>
      <Place x={988} y={572.45} w={400.24} h={398.63}><Photo src="img-a25bfbf91d.png" inner={{ x: -987.93, y: -572.46, w: 1919.8, h: 1080.03 }} /></Place>
      <Place x={0} y={0} w={918.5} h={1080}><Photo src="img-49f0d0b77a.png" /></Place>
      <Place x={1430.43} y={572.45} w={400.24} h={398.63}><Photo src="img-a25bfbf91d.png" inner={{ x: -1420.15, y: -572.46, w: 1919.8, h: 1080.03 }} /></Place>
      <Place x={988} y={156.4}>
        <Text size={71} weight={700} color="#0052FF" leading={1.14} maxWidth={487}>{"Clique para\neditar texto"}</Text>
      </Place>
      <Place x={988} y={373.6}>
        <Text size={24.7} weight={500} color="#000000" leading={1.32} maxWidth={698}>{"Lorem ipsum dolor sit amet, consectetur adipiscing\nelit etiam nec suscipit dui. Sed cursus nibh id risus\nultrices convallis."}</Text>
      </Place>
    </Slide>
  );
}
