import { Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 15" };

// Faithful reproduction of the official template's Slide 15.
export default function Slide15() {
  return (
    <Slide bg="blue-section" pad={false}>
      <Place x={0} y={0} w={1930.56} h={1079.99}><Photo src="img-e724e6a599.png" inner={{ x: 0, y: 0, w: 2120.33, h: 1192.63 }} /></Place>
      <Place x={185} y={252.19} w={446} h={240.28}><Photo src="img-7b6555cbba.png" /></Place>
      <Place x={185} y={587.19} w={446} h={240.62}><Photo src="img-2d740c45b6.png" /></Place>
      <Place x={737} y={252.19} w={446} h={240.46}><Photo src="img-c5ead63246.png" /></Place>
      <Place x={737} y={587.19} w={446} h={240.07}><Photo src="img-7d567e09a3.png" /></Place>
      <Place x={1289} y={252.19} w={446} h={240.19}><Photo src="img-6963d3e042.png" /></Place>
      <Place x={1289} y={587.19} w={446} h={240.33}><Photo src="img-1b6dcd00dc.png" /></Place>
      <Place x={1289} y={356.1}>
        <Text size={33.9} weight={700} color="#FFFFFF" leading={1.32} maxWidth={409}>{"3. Clique para editar"}</Text>
      </Place>
      <Place x={180} y={356.2}>
        <Text size={33.9} weight={700} color="#FFFFFF" leading={1.32} maxWidth={409}>{"1. Clique para editar"}</Text>
      </Place>
      <Place x={734.5} y={356.4}>
        <Text size={33.9} weight={700} color="#FFFFFF" leading={1.32} maxWidth={409}>{"2. Clique para editar"}</Text>
      </Place>
      <Place x={1289} y={416.1}>
        <Text size={26.9} weight={500} color="#FFFFFF" leading={1.32} maxWidth={410}>{"Lorem ipsum dolor sit amet\nconsectetur adipiscing elit"}</Text>
      </Place>
      <Place x={180} y={416.2}>
        <Text size={26.9} weight={500} color="#FFFFFF" leading={1.32} maxWidth={410}>{"Lorem ipsum dolor sit amet\nconsectetur adipiscing elit"}</Text>
      </Place>
      <Place x={734.5} y={416.4}>
        <Text size={26.9} weight={500} color="#FFFFFF" leading={1.32} maxWidth={410}>{"Lorem ipsum dolor sit amet\nconsectetur adipiscing elit"}</Text>
      </Place>
      <Place x={734.5} y={691}>
        <Text size={33.9} weight={700} color="#FFFFFF" leading={1.32} maxWidth={409}>{"5. Clique para editar"}</Text>
      </Place>
      <Place x={1289} y={691.2}>
        <Text size={33.9} weight={700} color="#FFFFFF" leading={1.32} maxWidth={409}>{"6. Clique para editar"}</Text>
      </Place>
      <Place x={180} y={691.5}>
        <Text size={33.9} weight={700} color="#FFFFFF" leading={1.32} maxWidth={409}>{"4. Clique para editar"}</Text>
      </Place>
      <Place x={734.5} y={751}>
        <Text size={26.9} weight={500} color="#FFFFFF" leading={1.32} maxWidth={410}>{"Lorem ipsum dolor sit amet\nconsectetur adipiscing elit"}</Text>
      </Place>
      <Place x={1289} y={751.2}>
        <Text size={26.9} weight={500} color="#FFFFFF" leading={1.32} maxWidth={410}>{"Lorem ipsum dolor sit amet\nconsectetur adipiscing elit"}</Text>
      </Place>
      <Place x={180} y={751.5}>
        <Text size={26.9} weight={500} color="#FFFFFF" leading={1.32} maxWidth={410}>{"Lorem ipsum dolor sit amet\nconsectetur adipiscing elit"}</Text>
      </Place>
    </Slide>
  );
}
