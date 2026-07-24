import { Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 47" };

// Faithful reproduction of the official template's Slide 47.
export default function Slide47() {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={819.88} h={1080}><Photo src="img-82f980769f.png" inner={{ x: 0, y: 0, w: 1919.95, h: 1080 }} /></Place>
      <Place x={82} y={139} w={183} h={41.94}><Photo src="img-dd5f278a20.png" /></Place>
      <Place x={922} y={108.8}>
        <Text size={30.7} weight={700} color="#000000" leading={1.32} maxWidth={200}>{"Email"}</Text>
      </Place>
      <Place x={922} y={192.8}>
        <Text size={51.6} weight={700} color="#000000" leading={1.14} maxWidth={596}>{"contact@vinta.com"}</Text>
      </Place>
      <Place x={922} y={472.8}>
        <Text size={30.7} weight={700} color="#000000" leading={1.32} maxWidth={200}>{"outro"}</Text>
      </Place>
      <Place x={922} y={556.8}>
        <Text size={51.6} weight={700} color="#000000" leading={1.14} maxWidth={374}>{"inserir texto"}</Text>
      </Place>
      <Place x={101} y={676.3}>
        <Text size={40.3} weight={700} color="#FFFFFF" leading={1.14} maxWidth={258}>{"Thank you"}</Text>
      </Place>
      <Place x={101} y={760.9}>
        <Text size={93.6} weight={700} color="#FFFFFF" leading={1.14} maxWidth={639}>{"Clique para\neditar"}</Text>
      </Place>
      <Place x={922} y={836.8}>
        <Text size={30.7} weight={700} color="#000000" leading={1.32} maxWidth={200}>{"outro"}</Text>
      </Place>
      <Place x={922} y={920.8}>
        <Text size={51.6} weight={700} color="#000000" leading={1.14} maxWidth={374}>{"inserir texto"}</Text>
      </Place>
    </Slide>
  );
}
