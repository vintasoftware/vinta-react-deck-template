import { Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 06" };

// Faithful reproduction of the official template's Slide 06.
export default function Slide06() {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={1920} h={1080}><Photo src="img-98a2504caf.png" /></Place>
      <Place x={1637} y={820} w={138.98} h={139.8}><Photo src="img-bb66fcf0a9.png" /></Place>
      <Place x={79} y={60} w={255} h={254.2}><Photo src="img-16d705fbcc.png" /></Place>
      <Place x={101} y={746.7}>
        <Text size={93.6} weight={700} color="#000000" leading={1.14} maxWidth={639}>{"Clique para"}</Text>
      </Place>
      <Place x={101} y={890.7}>
        <Text size={93.6} weight={700} color="#0052FF" leading={1.14} maxWidth={736}>{"editar o texto"}</Text>
      </Place>
    </Slide>
  );
}
