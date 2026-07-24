import { Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 10" };

// Faithful reproduction of the official template's Slide 10.
export default function Slide10() {
  return (
    <Slide bg="white" pad={false}>
      <Place x={1672.44} y={123.22} w={123.51} h={122.76}><Photo src="img-d3776cb9c0.png" /></Place>
      <Place x={1672.63} y={0} w={123.3} h={123.21}><Photo src="img-2b09489048.png" /></Place>
      <Place x={1795.95} y={123.21} w={123.61} h={122.88}><Photo src="img-f7818b614a.png" /></Place>
      <Place x={101} y={126.4}>
        <Text size={71} weight={700} color="#000000" leading={1.14} maxWidth={760}>{"Insira o texto aqui"}</Text>
      </Place>
      <Place x={101} y={232.1}>
        <Text size={26.9} weight={500} color="#000000" leading={1.32} maxWidth={706}>{"Lorem ipsum dolor sit amet, consectetur\nadipiscing elit etiam nec suscipit dui sed cursus\nnibh id risus ultrices convallis ."}</Text>
      </Place>
      <Place x={101} y={473.1}>
        <Text size={64.5} weight={700} color="#0052FF" leading={1.14} maxWidth={349}>{"01. Texto"}</Text>
      </Place>
      <Place x={1246.6} y={473.1}>
        <Text size={64.5} weight={700} color="#0052FF" leading={1.14} maxWidth={349}>{"03. Texto"}</Text>
      </Place>
      <Place x={101} y={732.6}>
        <Text size={64.5} weight={700} color="#0052FF" leading={1.14} maxWidth={349}>{"02. Texto"}</Text>
      </Place>
      <Place x={1246.6} y={732.6}>
        <Text size={64.5} weight={700} color="#0052FF" leading={1.14} maxWidth={349}>{"04. Texto"}</Text>
      </Place>
    </Slide>
  );
}
