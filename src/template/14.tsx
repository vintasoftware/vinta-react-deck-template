import { Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 14" };

// Faithful reproduction of the official template's Slide 14.
export default function Slide14() {
  return (
    <Slide bg="white" pad={false}>
      <Place x={1535.22} y={0} w={384.77} h={382.76}><Photo src="img-e60976291e.png" inner={{ x: -1535.15, y: 0, w: 1919.93, h: 1079.99 }} /></Place>
      <Place x={0} y={697.24} w={587.64} h={382.76}><Photo src="img-e60976291e.png" inner={{ x: -11.56, y: -591.23, w: 1919.88, h: 1079.96 }} /></Place>
      <Place x={1086} y={659.99} w={684.75} h={74}><Photo src="img-ee4010a0a2.png" /></Place>
      <Place x={1086} y={450} w={684.75} h={74}><Photo src="img-b3e972ae17.png" /></Place>
      <Place x={1086} y={240} w={684.75} h={74}><Photo src="img-b3e972ae17.png" /></Place>
      <Place x={200} y={659.99} w={684.75} h={74}><Photo src="img-ee4010a0a2.png" /></Place>
      <Place x={200} y={450} w={684.75} h={74}><Photo src="img-b3e972ae17.png" /></Place>
      <Place x={200} y={240} w={684.75} h={74}><Photo src="img-b3e972ae17.png" /></Place>
      <Place x={271.3} y={254.8}>
        <Text size={51.6} weight={700} color="#000000" leading={1.14} maxWidth={548}>{"Clique para editar"}</Text>
      </Place>
      <Place x={1183.9} y={254.8}>
        <Text size={51.6} weight={700} color="#000000" leading={1.14} maxWidth={548}>{"Clique para editar"}</Text>
      </Place>
      <Place x={195} y={268}>
        <Text size={24.2} weight={500} color="#0052FF" leading={1.32} maxWidth={200}>{"01"}</Text>
      </Place>
      <Place x={1081} y={268}>
        <Text size={24.2} weight={500} color="#0052FF" leading={1.32} maxWidth={200}>{"04"}</Text>
      </Place>
      <Place x={271.3} y={464.8}>
        <Text size={51.6} weight={700} color="#000000" leading={1.14} maxWidth={548}>{"Clique para editar"}</Text>
      </Place>
      <Place x={1183.9} y={464.8}>
        <Text size={51.6} weight={700} color="#000000" leading={1.14} maxWidth={548}>{"Clique para editar"}</Text>
      </Place>
      <Place x={195} y={478}>
        <Text size={24.2} weight={500} color="#0052FF" leading={1.32} maxWidth={200}>{"02"}</Text>
      </Place>
      <Place x={1081} y={478}>
        <Text size={24.2} weight={500} color="#0052FF" leading={1.32} maxWidth={200}>{"05"}</Text>
      </Place>
      <Place x={271.3} y={674.8}>
        <Text size={51.6} weight={700} color="#000000" leading={1.14} maxWidth={548}>{"Clique para editar"}</Text>
      </Place>
      <Place x={1183.9} y={674.8}>
        <Text size={51.6} weight={700} color="#000000" leading={1.14} maxWidth={548}>{"Clique para editar"}</Text>
      </Place>
      <Place x={195} y={688}>
        <Text size={24.2} weight={500} color="#0052FF" leading={1.32} maxWidth={200}>{"03"}</Text>
      </Place>
      <Place x={1081} y={688}>
        <Text size={24.2} weight={500} color="#0052FF" leading={1.32} maxWidth={200}>{"06"}</Text>
      </Place>
    </Slide>
  );
}
