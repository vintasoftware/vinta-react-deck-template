import { Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 32" };

// Faithful reproduction of the official template's Slide 32.
export default function Slide32() {
  return (
    <Slide bg="white" pad={false}>
      <Place x={882.12} y={169.78} w={892} h={763.3}><Photo src="img-9e74fef173.png" /></Place>
      <Place x={106} y={524.43} w={191.95} h={54}><Photo src="img-eb60db2e06.png" /></Place>
      <Place x={528} y={524.43} w={192.1} h={54}><Photo src="img-15430290fd.png" /></Place>
      <Place x={106} y={662.01} w={192.66} h={54}><Photo src="img-5f5067dbf5.png" /></Place>
      <Place x={528} y={662.01} w={191.87} h={54}><Photo src="img-d76739dc30.png" /></Place>
      <Place x={106} y={800.01} w={191.83} h={54}><Photo src="img-cf6564acbe.png" /></Place>
      <Place x={528} y={800.01} w={191.83} h={54}><Photo src="img-e7cca89209.png" /></Place>
      <Place x={101} y={246.4}>
        <Text size={71} weight={700} color="#000000" leading={1.14} maxWidth={487}>{"Clique para\neditar texto"}</Text>
      </Place>
      <Place x={182} y={534.2}>
        <Text size={33.9} weight={700} color="#000000" leading={1.32} maxWidth={200}>{"Texto"}</Text>
      </Place>
      <Place x={604} y={534.2}>
        <Text size={33.9} weight={700} color="#000000" leading={1.32} maxWidth={200}>{"Texto"}</Text>
      </Place>
      <Place x={183} y={671.8}>
        <Text size={33.9} weight={700} color="#000000" leading={1.32} maxWidth={200}>{"Texto"}</Text>
      </Place>
      <Place x={604} y={671.8}>
        <Text size={33.9} weight={700} color="#000000" leading={1.32} maxWidth={200}>{"Texto"}</Text>
      </Place>
      <Place x={182} y={809.8}>
        <Text size={33.9} weight={700} color="#000000" leading={1.32} maxWidth={200}>{"Texto"}</Text>
      </Place>
      <Place x={604} y={809.8}>
        <Text size={33.9} weight={700} color="#000000" leading={1.32} maxWidth={200}>{"Texto"}</Text>
      </Place>
    </Slide>
  );
}
