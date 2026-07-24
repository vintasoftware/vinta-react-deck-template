import { Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 22" };

// Faithful reproduction of the official template's Slide 22.
export default function Slide22() {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={1920} h={486.03}><Photo src="img-872308a9c5.png" inner={{ x: 0, y: -593.96, w: 1920, h: 1079.99 }} /></Place>
      <Place x={106} y={34.03} w={324} h={228}><Photo src="img-5b7cebde01.png" /></Place>
      <Place x={719} y={34.03} w={450} h={228}><Photo src="img-1e29206b10.png" /></Place>
      <Place x={1458} y={34.03} w={355} h={228}><Photo src="img-61ec18f24a.png" /></Place>
      <Place x={101} y={168.8}>
        <Text size={158.1} weight={700} color="#FFFFFF" leading={1.14} maxWidth={340}>{"32+"}</Text>
      </Place>
      <Place x={714} y={168.8}>
        <Text size={158.1} weight={700} color="#FFFFFF" leading={1.14} maxWidth={449}>{"500+"}</Text>
      </Place>
      <Place x={1453} y={168.8}>
        <Text size={158.1} weight={700} color="#FFFFFF" leading={1.14} maxWidth={389}>{"10M"}</Text>
      </Place>
      <Place x={101} y={346.7}>
        <Text size={22.6} weight={500} color="#FFFFFF" leading={1.32} maxWidth={244}>{"Clique para editar"}</Text>
      </Place>
      <Place x={714} y={346.7}>
        <Text size={22.6} weight={500} color="#FFFFFF" leading={1.32} maxWidth={244}>{"Clique para editar"}</Text>
      </Place>
      <Place x={1453} y={346.7}>
        <Text size={22.6} weight={500} color="#FFFFFF" leading={1.32} maxWidth={244}>{"Clique para editar"}</Text>
      </Place>
      <Place x={101} y={655.8}>
        <Text size={71} weight={700} color="#000000" leading={1.14} maxWidth={487}>{"Clique para\neditar"}</Text>
      </Place>
      <Place x={1186} y={672.6}>
        <Text size={24.7} weight={500} color="#000000" leading={1.32} maxWidth={570}>{"Lectus enim adipiscing suspendisse\nviverra cras facilisi blandit scelerisque\nfacilisis vel porta quisque cursus\nvulputate gravida interdum mollis ac\nvarius consectetur."}</Text>
      </Place>
    </Slide>
  );
}
