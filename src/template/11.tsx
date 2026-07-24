import { Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 11" };

// Faithful reproduction of the official template's Slide 11.
export default function Slide11() {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={904} h={589.93}><Photo src="img-d19466c406.png" inner={{ x: 0, y: 0, w: 1919.97, h: 1079.99 }} /></Place>
      <Place x={0} y={606.1} w={904} h={473.89}><Photo src="img-d19466c406.png" inner={{ x: 0, y: -786.96, w: 1919.97, h: 1402.3 }} /></Place>
      <Place x={1020} y={324.8} w={94.63} h={94.35}><Photo src="img-5e30e6fbc1.png" /></Place>
      <Place x={1017} y={796.74} w={94.59} h={94.16}><Photo src="img-4f89bb6de1.png" /></Place>
      <Place x={1017} y={550.6} w={94.2} h={93.99}><Photo src="img-02060c732d.png" /></Place>
      <Place x={1015} y={113.2}>
        <Text size={71} weight={700} color="#000000" leading={1.14} maxWidth={751}>{"Clique para editar"}</Text>
      </Place>
      <Place x={1151} y={303.2}>
        <Text size={33.9} weight={700} color="#000000" leading={1.32} maxWidth={362}>{"Clique para editar"}</Text>
      </Place>
      <Place x={1151} y={363.2}>
        <Text size={26.9} weight={500} color="#000000" leading={1.32} maxWidth={641}>{"Aliquet sit orci aliquam morbi mauris mattis\nquisque dolor viverradolort"}</Text>
      </Place>
      <Place x={1151} y={541.2}>
        <Text size={33.9} weight={700} color="#000000" leading={1.32} maxWidth={362}>{"Clique para editar"}</Text>
      </Place>
      <Place x={1151} y={601.2}>
        <Text size={26.9} weight={500} color="#000000" leading={1.32} maxWidth={641}>{"Aliquet sit orci aliquam morbi mauris mattis\nquisque dolor viverradolort"}</Text>
      </Place>
      <Place x={70.8} y={662.3}>
        <Text size={64.5} weight={700} color="#FFFFFF" leading={1.14} maxWidth={683}>{"Clique para editar"}</Text>
      </Place>
      <Place x={70.8} y={774.1}>
        <Text size={26.9} weight={500} color="#FFFFFF" leading={1.32} maxWidth={626}>{"Lorem ipsum dolor sit amet, consectetur\nadipiscing elit. Etiam nec suscipit dui. Sed\ncursus nibh id risus ultrices convallis."}</Text>
      </Place>
      <Place x={1151} y={779.2}>
        <Text size={26.9} weight={500} color="#000000" leading={1.32} maxWidth={641}>{"Clique para editar\nAliquet sit orci aliquam morbi mauris mattis\nquisque dolor viverradolort"}</Text>
      </Place>
    </Slide>
  );
}
