import { Photo, Place, Shape, Slide, Text } from "@/lib";

export const meta = { title: "Slide 05" };

// Faithful reproduction of the official template's Slide 05.
export default function Slide05() {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={1920} h={1080}><Photo src="img-08df3f6396.png" /></Place>
      <Place x={1616} y={298} w={187.56} h={187.83}><Shape n={8} fit="cover" /></Place>
      <Place x={1431} y={485} w={187.43} h={186.71}><Shape n={9} fit="cover" /></Place>
      <Place x={1616} y={111} w={187.51} h={186.97}><Shape n={10} fit="cover" /></Place>
      <Place x={1241} y={298} w={189.78} h={186.53}><Shape n={15} fit="cover" /></Place>
      <Place x={106} y={116} w={225} h={52}><Photo src="img-980bd1d188.png" /></Place>
      <Place x={106} y={907} w={1739} h={70}><Photo src="img-6779401282.png" /></Place>
      <Place x={101} y={317.9}>
        <Text size={93.6} weight={700} color="#000000" leading={1.14} maxWidth={736}>{"Clique para\neditar o texto"}</Text>
      </Place>
      <Place x={101} y={913.8}>
        <Text size={23.7} weight={500} color="#000000" leading={1.32} maxWidth={200}>{"Cliente\nPlusPlus"}</Text>
      </Place>
      <Place x={657} y={913.8}>
        <Text size={23.7} weight={500} color="#000000" leading={1.32} maxWidth={384}>{"Email\ninseriremail@vinta.com.br"}</Text>
      </Place>
      <Place x={1592} y={913.8}>
        <Text size={23.7} weight={500} color="#000000" leading={1.32} maxWidth={200}>{"Data\nJaneiro 2023"}</Text>
      </Place>
    </Slide>
  );
}
