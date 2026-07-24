import { Photo, Place, Shape, Slide, Text } from "@/lib";

export const meta = { title: "Slide 45" };

// Faithful reproduction of the official template's Slide 45.
export default function Slide45() {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={1920} h={745.94}><Photo src="img-525507862e.png" inner={{ x: 0, y: 0, w: 1920, h: 1079.96 }} /></Place>
      <Place x={1601} y={147} w={197} h={195.51}><Shape n={7} fit="cover" /></Place>
      <Place x={1618} y={894.98} w={183} h={41.94}><Photo src="img-e82936c3d8.png" /></Place>
      <Place x={101} y={489.7}>
        <Text size={158.1} weight={700} color="#FFFFFF" leading={1.14} maxWidth={908}>{"Thank you"}</Text>
      </Place>
      <Place x={101} y={859}>
        <Text size={24.2} weight={500} color="#000000" leading={1.32} maxWidth={200}>{"Email"}</Text>
      </Place>
      <Place x={799} y={859}>
        <Text size={24.2} weight={500} color="#000000" leading={1.32} maxWidth={201}>{"Info a desejar"}</Text>
      </Place>
      <Place x={101} y={921.7}>
        <Text size={33.9} weight={700} color="#000000" leading={1.32} maxWidth={394}>{"contact@vinta.com"}</Text>
      </Place>
      <Place x={799} y={921.7}>
        <Text size={33.9} weight={700} color="#000000" leading={1.32} maxWidth={234}>{"Informação"}</Text>
      </Place>
    </Slide>
  );
}
