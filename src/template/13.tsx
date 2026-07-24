import { Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 13" };

// Faithful reproduction of the official template's Slide 13.
export default function Slide13() {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={1920} h={1080}><Photo src="img-603b384546.png" /></Place>
      <Place x={0} y={0} w={1920} h={1080}><Photo src="img-603b384546.png" /></Place>
      <Place x={1274} y={0} w={646} h={1080}><Photo src="img-38db0dfe14.png" /></Place>
      <Place x={106} y={134} w={741} h={245}><Photo src="img-012fef3689.png" /></Place>
      <Place x={990} y={184} w={778} h={692.24}><Photo src="img-9518714658.png" /></Place>
      <Place x={1647} y={635} w={242.28} h={240.98}><Photo src="img-9bc85c4d8c.png" /></Place>
      <Place x={101} y={135.4}>
        <Text size={71} weight={700} color="#000000" leading={1.14} maxWidth={751}>{"Clique para editar"}</Text>
      </Place>
      <Place x={101} y={260.7}>
        <Text size={26.9} weight={500} color="#000000" leading={1.32} maxWidth={619}>{"Lorem ipsum dolor sit amet, consecteturd\ncursus nibh id risus ultrices convallis\nphasellus vel tristique diam ham placerat."}</Text>
      </Place>
      <Place x={101} y={470.9}>
        <Text size={93.6} weight={700} color="#000000" leading={1.14} maxWidth={269}>{"200+"}</Text>
      </Place>
      <Place x={538} y={470.9}>
        <Text size={93.6} weight={700} color="#000000" leading={1.14} maxWidth={205}>{"85+"}</Text>
      </Place>
      <Place x={101} y={583}>
        <Text size={24.2} weight={500} color="#000000" leading={1.32} maxWidth={261}>{"Clique para editar"}</Text>
      </Place>
      <Place x={538} y={583}>
        <Text size={24.2} weight={500} color="#000000" leading={1.32} maxWidth={261}>{"Clique para editar"}</Text>
      </Place>
      <Place x={101} y={735.9}>
        <Text size={93.6} weight={700} color="#000000" leading={1.14} maxWidth={301}>{"+10M"}</Text>
      </Place>
      <Place x={538} y={735.9}>
        <Text size={93.6} weight={700} color="#000000" leading={1.14} maxWidth={353}>{"+500K"}</Text>
      </Place>
      <Place x={101} y={848}>
        <Text size={24.2} weight={500} color="#000000" leading={1.32} maxWidth={261}>{"Clique para editar"}</Text>
      </Place>
      <Place x={538} y={848}>
        <Text size={24.2} weight={500} color="#000000" leading={1.32} maxWidth={261}>{"Clique para editar"}</Text>
      </Place>
    </Slide>
  );
}
