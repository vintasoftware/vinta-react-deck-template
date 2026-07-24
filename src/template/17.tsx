import { Photo, Place, Shape, Slide, Text } from "@/lib";

export const meta = { title: "Slide 17" };

// Faithful reproduction of the official template's Slide 17.
export default function Slide17() {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={1920} h={1080.01}><Photo src="img-45526c2d9e.png" inner={{ x: 0, y: 0, w: 2119.28, h: 1192.22 }} /></Place>
      <Place x={865.25} y={186} w={429.54} h={321}><Photo src="img-c96c2e2daf.png" /></Place>
      <Place x={865.25} y={601} w={429.54} h={321}><Photo src="img-c96c2e2daf.png" /></Place>
      <Place x={1384} y={601} w={429.54} h={321}><Photo src="img-c96c2e2daf.png" /></Place>
      <Place x={138} y={194} w={479} h={338}><Photo src="img-48e9e274bb.png" /></Place>
      <Place x={138} y={724} w={168} h={167.75}><Shape n={6} fit="cover" /></Place>
      <Place x={133} y={185.4}>
        <Text size={71} weight={700} color="#FFFFFF" leading={1.14} maxWidth={487}>{"Clique para\neditar"}</Text>
      </Place>
      <Place x={905.1} y={206.4}>
        <Text size={71} weight={700} color="#FFFFFF" leading={1.14} maxWidth={200}>{"01"}</Text>
      </Place>
      <Place x={1424.1} y={206.4}>
        <Text size={71} weight={700} color="#FFFFFF" leading={1.14} maxWidth={200}>{"02"}</Text>
      </Place>
      <Place x={905.1} y={322.7}>
        <Text size={33.9} weight={700} color="#FFFFFF" leading={1.32} maxWidth={362}>{"Clique para editar"}</Text>
      </Place>
      <Place x={1424.1} y={322.7}>
        <Text size={33.9} weight={700} color="#FFFFFF" leading={1.32} maxWidth={362}>{"Clique para editar"}</Text>
      </Place>
      <Place x={905.1} y={388.1}>
        <Text size={24.7} weight={500} color="#FFFFFF" leading={1.32} maxWidth={401}>{"Porta sit viverra ultricies at\nblandit dui nibh at sed et\npellentesque eget dolor sit\namet consectur dolor sit met."}</Text>
      </Place>
      <Place x={1424.1} y={388.1}>
        <Text size={24.7} weight={500} color="#FFFFFF" leading={1.32} maxWidth={401}>{"Porta sit viverra ultricies at\nblandit dui nibh at sed et\npellentesque eget dolor sit\namet consectur dolor sit met."}</Text>
      </Place>
      <Place x={133} y={413.7}>
        <Text size={26.9} weight={500} color="#FFFFFF" leading={1.32} maxWidth={480}>{"Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit etiam\nnec suscipit dui sed cursus nibh\nid risus ultrices convallis ."}</Text>
      </Place>
      <Place x={905.1} y={621.4}>
        <Text size={71} weight={700} color="#FFFFFF" leading={1.14} maxWidth={200}>{"03"}</Text>
      </Place>
      <Place x={1424.1} y={621.4}>
        <Text size={71} weight={700} color="#FFFFFF" leading={1.14} maxWidth={200}>{"04"}</Text>
      </Place>
      <Place x={905.1} y={737.7}>
        <Text size={33.9} weight={700} color="#FFFFFF" leading={1.32} maxWidth={362}>{"Clique para editar"}</Text>
      </Place>
      <Place x={1424.1} y={737.7}>
        <Text size={33.9} weight={700} color="#FFFFFF" leading={1.32} maxWidth={362}>{"Clique para editar"}</Text>
      </Place>
      <Place x={905.1} y={803.1}>
        <Text size={24.7} weight={500} color="#FFFFFF" leading={1.32} maxWidth={401}>{"Porta sit viverra ultricies at\nblandit dui nibh at sed et\npellentesque eget dolor sit\namet consectur dolor sit met."}</Text>
      </Place>
      <Place x={1424.1} y={803.1}>
        <Text size={24.7} weight={500} color="#FFFFFF" leading={1.32} maxWidth={401}>{"Porta sit viverra ultricies at\nblandit dui nibh at sed et\npellentesque eget dolor sit\namet consectur dolor sit met."}</Text>
      </Place>
    </Slide>
  );
}
