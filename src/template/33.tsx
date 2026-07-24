import { Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 33" };

// Faithful reproduction of the official template's Slide 33.
export default function Slide33() {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={1930.56} h={1079.99}><Photo src="img-e724e6a599.png" inner={{ x: 0, y: 0, w: 2120.33, h: 1192.63 }} /></Place>
      <Place x={90.39} y={294.18} w={244.33} h={243.35}><Photo src="img-a25bfbf91d.png" inner={{ x: -664.72, y: -390.27, w: 1267.8, h: 713.24 }} /></Place>
      <Place x={90.39} y={615.18} w={244.33} h={243.35}><Photo src="img-a25bfbf91d.png" inner={{ x: -664.72, y: -390.27, w: 1267.8, h: 713.24 }} /></Place>
      <Place x={983.6} y={294.18} w={244.33} h={243.35}><Photo src="img-a25bfbf91d.png" inner={{ x: -664.72, y: -390.27, w: 1267.8, h: 713.24 }} /></Place>
      <Place x={983.6} y={615.18} w={244.33} h={243.35}><Photo src="img-a25bfbf91d.png" inner={{ x: -664.72, y: -390.27, w: 1267.8, h: 713.24 }} /></Place>
      <Place x={0} y={126.4} w={1920}>
        <Text size={71} weight={700} color="#FFFFFF" align="center" leading={1.14}>{"Clique para editar texto"}</Text>
      </Place>
      <Place x={398} y={314.5}>
        <Text size={33.9} weight={700} color="#FFFFFF" leading={1.32} maxWidth={474}>{"Clique para editar texto"}</Text>
      </Place>
      <Place x={1293} y={314.5}>
        <Text size={33.9} weight={700} color="#FFFFFF" leading={1.32} maxWidth={474}>{"Clique para editar texto"}</Text>
      </Place>
      <Place x={398} y={373.9}>
        <Text size={24.7} weight={500} color="#FFFFFF" leading={1.32} maxWidth={497}>{"Ut suscipit mi cursus hendrerit ac\nnunc leo pellentesque mauris mattis\neget metus massa blandit eu nulla\nlobortis hendrerit sit ut."}</Text>
      </Place>
      <Place x={1293} y={373.9}>
        <Text size={24.7} weight={500} color="#FFFFFF" leading={1.32} maxWidth={497}>{"Ut suscipit mi cursus hendrerit ac\nnunc leo pellentesque mauris mattis\neget metus massa blandit eu nulla\nlobortis hendrerit sit ut."}</Text>
      </Place>
      <Place x={398} y={632.9}>
        <Text size={33.9} weight={700} color="#FFFFFF" leading={1.32} maxWidth={474}>{"Clique para editar texto"}</Text>
      </Place>
      <Place x={1293} y={632.9}>
        <Text size={33.9} weight={700} color="#FFFFFF" leading={1.32} maxWidth={474}>{"Clique para editar texto"}</Text>
      </Place>
      <Place x={398} y={692.3}>
        <Text size={24.7} weight={500} color="#FFFFFF" leading={1.32} maxWidth={497}>{"Ut suscipit mi cursus hendrerit ac\nnunc leo pellentesque mauris mattis\neget metus massa blandit eu nulla\nlobortis hendrerit sit ut."}</Text>
      </Place>
      <Place x={1293} y={692.3}>
        <Text size={24.7} weight={500} color="#FFFFFF" leading={1.32} maxWidth={497}>{"Ut suscipit mi cursus hendrerit ac\nnunc leo pellentesque mauris mattis\neget metus massa blandit eu nulla\nlobortis hendrerit sit ut."}</Text>
      </Place>
    </Slide>
  );
}
