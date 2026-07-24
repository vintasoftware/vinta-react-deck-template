import { Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 20" };

// Faithful reproduction of the official template's Slide 20.
export default function Slide20() {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={1920} h={1080}><Photo src="img-bdb40f5afb.png" /></Place>
      <Place x={0} y={0} w={403} h={402}><Photo src="img-c656df62d1.png" /></Place>
      <Place x={1010.33} y={98.03} w={817.54} h={764.12}><Photo src="img-bdb40f5afb.png" inner={{ x: -1000.98, y: -106.82, w: 1919.97, h: 1080 }} /></Place>
      <Place x={101} y={539.1}>
        <Text size={24.2} weight={500} color="#FFFFFF" leading={1.32} maxWidth={200}>{"Texto"}</Text>
      </Place>
      <Place x={101} y={604.6}>
        <Text size={71} weight={700} color="#FFFFFF" leading={1.14} maxWidth={702}>{"Clique nesta\ncaixa para editar\no texto"}</Text>
      </Place>
    </Slide>
  );
}
