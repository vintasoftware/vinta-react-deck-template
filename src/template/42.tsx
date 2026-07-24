import { Photo, Place, Shape, Slide, Text } from "@/lib";

export const meta = { title: "Slide 42" };

// Faithful reproduction of the official template's Slide 42.
export default function Slide42() {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={1920} h={1080}><Photo src="img-603b384546.png" /></Place>
      <Place x={811} y={106} w={260} h={260}><Photo src="img-11d61010f2.png" /></Place>
      <Place x={811} y={544} w={260} h={260}><Photo src="img-11d61010f2.png" /></Place>
      <Place x={1182.5} y={106} w={260} h={260}><Photo src="img-e2f76a33b8.png" /></Place>
      <Place x={1182.5} y={544} w={260} h={260}><Photo src="img-e2f76a33b8.png" /></Place>
      <Place x={1554} y={106} w={260} h={260}><Photo src="img-67fc2595dc.png" /></Place>
      <Place x={106} y={403.02} w={622.28} h={328}><Photo src="img-c6e9bbff52.png" /></Place>
      <Place x={1554} y={544} w={260} h={260}><Photo src="img-67fc2595dc.png" /></Place>
      <Place x={0.54} y={0.03} w={104.32} h={103.75}><Shape n={2} fit="cover" flipX flipY /></Place>
      <Place x={104.75} y={0} w={104.25} h={103.78}><Shape n={13} fit="cover" flipX flipY /></Place>
      <Place x={0} y={103.56} w={106.02} h={104.29}><Shape n={21} fit="cover" flipX flipY /></Place>
      <Place x={101} y={374.4}>
        <Text size={71} weight={700} color="#0052FF" leading={1.14} maxWidth={487}>{"Clique para\neditar texto"}</Text>
      </Place>
      <Place x={821} y={399.8} w={240}>
        <Text size={30.7} weight={700} color="#000000" align="center" leading={1.32}>{"Nome"}</Text>
      </Place>
      <Place x={1192.5} y={399.8} w={240}>
        <Text size={30.7} weight={700} color="#000000" align="center" leading={1.32}>{"Nome"}</Text>
      </Place>
      <Place x={1564} y={399.8} w={240}>
        <Text size={30.7} weight={700} color="#000000" align="center" leading={1.32}>{"Nome"}</Text>
      </Place>
      <Place x={821} y={456} w={240}>
        <Text size={24.2} weight={500} color="#0052FF" align="center" leading={1.32}>{"Cargo da pessoa"}</Text>
      </Place>
      <Place x={1192.5} y={456} w={240}>
        <Text size={24.2} weight={500} color="#0052FF" align="center" leading={1.32}>{"Cargo da pessoa"}</Text>
      </Place>
      <Place x={1564} y={456} w={240}>
        <Text size={24.2} weight={500} color="#0052FF" align="center" leading={1.32}>{"Cargo da pessoa"}</Text>
      </Place>
      <Place x={101} y={612.8}>
        <Text size={26.9} weight={500} color="#000000" leading={1.32} maxWidth={514}>{"Lorem ipsum dolor sit amet\nconsectetur adipiscing elit etiam\nnec suscipit dui sed cursus nibh id\nrisus ultrices convallis phasellus\nvel tristique diam."}</Text>
      </Place>
      <Place x={821} y={836.8} w={240}>
        <Text size={30.7} weight={700} color="#000000" align="center" leading={1.32}>{"Nome"}</Text>
      </Place>
      <Place x={1192.5} y={836.8} w={240}>
        <Text size={30.7} weight={700} color="#000000" align="center" leading={1.32}>{"Nome"}</Text>
      </Place>
      <Place x={1564} y={836.8} w={240}>
        <Text size={30.7} weight={700} color="#000000" align="center" leading={1.32}>{"Nome"}</Text>
      </Place>
      <Place x={821} y={893} w={240}>
        <Text size={24.2} weight={500} color="#0052FF" align="center" leading={1.32}>{"Cargo da pessoa"}</Text>
      </Place>
      <Place x={1192.5} y={893} w={240}>
        <Text size={24.2} weight={500} color="#0052FF" align="center" leading={1.32}>{"Cargo da pessoa"}</Text>
      </Place>
      <Place x={1564} y={893} w={240}>
        <Text size={24.2} weight={500} color="#0052FF" align="center" leading={1.32}>{"Cargo da pessoa"}</Text>
      </Place>
    </Slide>
  );
}
