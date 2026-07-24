import { Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 34" };

// Faithful reproduction of the official template's Slide 34.
export default function Slide34() {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={945.09} h={1080.01}><Photo src="img-c66076898b.png" inner={{ x: -94.98, y: 0, w: 1040.07, h: 1080.01 }} /></Place>
      <Place x={1827.86} y={0} w={92.14} h={92}><Photo src="img-434b82f370.png" /></Place>
      <Place x={1736.19} y={91.81} w={92} h={92.38}><Photo src="img-ee885161a0.png" /></Place>
      <Place x={1022} y={139.5}>
        <Text size={71} weight={700} color="#0052FF" leading={1.14} maxWidth={458}>{"Clique\npara editar"}</Text>
      </Place>
      <Place x={1109.5} y={424.5}>
        <Text size={51.6} weight={700} color="#000000" leading={1.14} maxWidth={200}>{"Texto\nTexto\nTexto\nTexto"}</Text>
      </Place>
    </Slide>
  );
}
