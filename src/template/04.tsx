import { Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 04" };

// Faithful reproduction of the official template's Slide 04.
export default function Slide04() {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={1919.7} h={1080}><Photo src="img-77255309fa.png" /></Place>
      <Place x={0} y={0} w={226} h={226.58}><Photo src="img-d940e2ad7d.png" /></Place>
      <Place x={107} y={381} w={210} h={48}><Photo src="img-bea7bafa63.png" /></Place>
      <Place x={102} y={505.9}>
        <Text size={93.6} weight={700} color="#000000" leading={1.14} maxWidth={362}>{"Inserir"}</Text>
      </Place>
      <Place x={102} y={649.9}>
        <Text size={93.6} weight={700} color="#0052FF" leading={1.14} maxWidth={593}>{"Título aqui"}</Text>
      </Place>
      <Place x={101} y={908.2}>
        <Text size={23.7} weight={500} color="#000000" leading={1.32} maxWidth={200}>{"Cliente\nPlusPlus"}</Text>
      </Place>
      <Place x={301} y={908.2}>
        <Text size={23.7} weight={500} color="#000000" leading={1.32} maxWidth={384}>{"Email\ninseriremail@vinta.com.br"}</Text>
      </Place>
      <Place x={760} y={908.2}>
        <Text size={23.7} weight={500} color="#000000" leading={1.32} maxWidth={200}>{"Data\nJaneiro 2023"}</Text>
      </Place>
    </Slide>
  );
}
