import { Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 26" };

// Faithful reproduction of the official template's Slide 26.
export default function Slide26() {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={1920} h={1080}><Photo src="img-34260598bb.png" /></Place>
      <Place x={-104.55} y={126.37} w={900} h={556.5}><Photo src="img-a82a2279c5.png" /></Place>
      <Place x={503.29} y={126.37} w={900} h={556.5}><Photo src="img-25a6cedeec.png" /></Place>
      <Place x={1112.01} y={126.37} w={900} h={556.5}><Photo src="img-a82a2279c5.png" /></Place>
      <Place x={0} y={1006.43} w={747.66} h={73.58}><Photo src="img-e724e6a599.png" inner={{ x: 0, y: -344.66, w: 821.15, h: 461.86 }} /></Place>
      <Place x={742.99} y={1006.43} w={373.84} h={73.58}><Photo src="img-e724e6a599.png" inner={{ x: 0, y: -344.66, w: 821.17, h: 461.86 }} /></Place>
      <Place x={1108.83} y={1006.43} w={747.66} h={73.58}><Photo src="img-e724e6a599.png" inner={{ x: 0, y: -344.66, w: 821.15, h: 461.86 }} /></Place>
      <Place x={1851.82} y={1006.43} w={68.18} h={73.58}><Photo src="img-e724e6a599.png" inner={{ x: 0, y: -344.66, w: 821.1, h: 461.86 }} /></Place>
      <Place x={280.6} y={376.6}>
        <Text size={53.8} weight={700} color="#FFFFFF" leading={1.14} maxWidth={200}>{"10M"}</Text>
      </Place>
      <Place x={895.2} y={376.6}>
        <Text size={53.8} weight={700} color="#FFFFFF" leading={1.14} maxWidth={200}>{"10M"}</Text>
      </Place>
      <Place x={1496.3} y={376.6}>
        <Text size={53.8} weight={700} color="#FFFFFF" leading={1.14} maxWidth={200}>{"10M"}</Text>
      </Place>
      <Place x={95.4} y={697.7} w={500}>
        <Text size={51.6} weight={700} color="#FFFFFF" align="center" leading={1.14}>{"Clique p/ editar"}</Text>
      </Place>
      <Place x={95.4} y={792.7} w={500}>
        <Text size={24.7} weight={500} color="#FFFFFF" align="center" leading={1.32}>{"Lectus enim adipiscing suspendisse\nviverra cras facilisi blandit celolr\nscelerisque facilisis"}</Text>
      </Place>
      <Place x={710} y={697.7} w={500}>
        <Text size={51.6} weight={700} color="#FFFFFF" align="center" leading={1.14}>{"Clique p/ editar"}</Text>
      </Place>
      <Place x={710} y={792.7} w={500}>
        <Text size={24.7} weight={500} color="#FFFFFF" align="center" leading={1.32}>{"Lectus enim adipiscing suspendisse\nviverra cras facilisi blandit celolr\nscelerisque facilisis"}</Text>
      </Place>
      <Place x={1311.1} y={697.7} w={500}>
        <Text size={51.6} weight={700} color="#FFFFFF" align="center" leading={1.14}>{"Clique p/ editar"}</Text>
      </Place>
      <Place x={1311.1} y={792.7} w={500}>
        <Text size={24.7} weight={500} color="#FFFFFF" align="center" leading={1.32}>{"Lectus enim adipiscing suspendisse\nviverra cras facilisi blandit celolr\nscelerisque facilisis"}</Text>
      </Place>
    </Slide>
  );
}
