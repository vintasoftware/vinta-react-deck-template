import { Photo, Place, Shape, Slide, Text } from "@/lib";

export const meta = { title: "Slide 07" };

// Faithful reproduction of the official template's Slide 07.
export default function Slide07() {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={1920} h={1080}><Photo src="img-b9186cf293.png" /></Place>
      <Place x={0} y={486} w={1200.69} h={594}><Photo src="img-71cac86e17.png" /></Place>
      <Place x={106} y={602} w={766} h={70}><Photo src="img-9aa9c6d1e5.png" /></Place>
      <Place x={1664} y={116} w={154.94} h={154}><Shape n={3} fit="cover" /></Place>
      <Place x={101} y={608.8}>
        <Text size={23.7} weight={500} color="#FFFFFF" leading={1.32} maxWidth={200}>{"Cliente\nPlusPlus"}</Text>
      </Place>
      <Place x={265} y={608.8}>
        <Text size={23.7} weight={500} color="#FFFFFF" leading={1.32} maxWidth={384}>{"Email\ninseriremail@vinta.com.br"}</Text>
      </Place>
      <Place x={688} y={608.8}>
        <Text size={23.7} weight={500} color="#FFFFFF" leading={1.32} maxWidth={200}>{"Data\nJaneiro 2023"}</Text>
      </Place>
      <Place x={101} y={738.9}>
        <Text size={93.6} weight={700} color="#FFFFFF" leading={1.14} maxWidth={987}>{"Clique para editar\no texto"}</Text>
      </Place>
    </Slide>
  );
}
