import { Photo, Place, Shape, Slide, Text } from "@/lib";

export const meta = { title: "Slide 18" };

// Faithful reproduction of the official template's Slide 18.
export default function Slide18() {
  return (
    <Slide bg="white" pad={false}>
      <Place x={107.79} y={602.23} w={127.42} h={128}><Photo src="img-ddb35cc958.png" /></Place>
      <Place x={109.21} y={729.52} w={128} h={127.42}><Shape n={13} fit="cover" /></Place>
      <Place x={235.21} y={602.52} w={128} h={127.42}><Photo src="img-eb6d6d26ba.png" /></Place>
      <Place x={237.21} y={729.23} w={127.42} h={128}><Photo src="img-9e9dfe2014.png" /></Place>
      <Place x={363.21} y={602.52} w={128} h={127.42}><Shape n={13} fit="cover" /></Place>
      <Place x={364.21} y={729.52} w={127} h={128}><Photo src="img-df75f8539b.png" /></Place>
      <Place x={280.81} y={-1.93} w={93.44} h={93.44}><Photo src="img-d11aab5d90.png" flipY /></Place>
      <Place x={187.37} y={-1.93} w={93.44} h={93.44}><Photo src="img-d11aab5d90.png" flipY /></Place>
      <Place x={0.5} y={-2.43} w={93.44} h={93.44}><Photo src="img-d11aab5d90.png" flipY /></Place>
      <Place x={1826.35} y={-1.81} w={93.65} h={93.26}><Photo src="img-01a5d20a1e.png" flipY /></Place>
      <Place x={0} y={-2.43} w={93.65} h={93.94}><Shape n={4} fit="cover" flipY /></Place>
      <Place x={93.44} y={-2.43} w={93.94} h={94.08}><Photo src="img-539d343430.png" flipY /></Place>
      <Place x={1732.46} y={-1.93} w={93.94} h={93.44}><Photo src="img-5965735368.png" flipY /></Place>
      <Place x={187.36} y={-2.42} w={93.52} h={93.88}><Shape n={11} fit="cover" flipY /></Place>
      <Place x={1826.38} y={91.65} w={93.59} h={93.64}><Photo src="img-187d5e1025.png" flipY /></Place>
      <Place x={104.2} y={195.2}>
        <Text size={51.6} weight={700} color="#0052FF" leading={1.14} maxWidth={200}>{"01"}</Text>
      </Place>
      <Place x={731.2} y={195.2}>
        <Text size={51.6} weight={700} color="#0052FF" leading={1.14} maxWidth={200}>{"02"}</Text>
      </Place>
      <Place x={1358.2} y={195.2}>
        <Text size={51.6} weight={700} color="#0052FF" leading={1.14} maxWidth={200}>{"03"}</Text>
      </Place>
      <Place x={104.2} y={288.9}>
        <Text size={33.9} weight={700} color="#000000" leading={1.32} maxWidth={362}>{"Clique para editar"}</Text>
      </Place>
      <Place x={731.2} y={288.9}>
        <Text size={33.9} weight={700} color="#000000" leading={1.32} maxWidth={362}>{"Clique para editar"}</Text>
      </Place>
      <Place x={1358.2} y={288.9}>
        <Text size={33.9} weight={700} color="#000000" leading={1.32} maxWidth={362}>{"Clique para editar"}</Text>
      </Place>
      <Place x={104.2} y={358.9}>
        <Text size={24.7} weight={500} color="#000000" leading={1.32} maxWidth={441}>{"Lectus lacus hendrerit morbi\nlectus eget orci nisi platea. Quis\nmi nisi ut integer. Lorem lacus\nbibendum turpis arcu."}</Text>
      </Place>
      <Place x={731.2} y={358.9}>
        <Text size={24.7} weight={500} color="#000000" leading={1.32} maxWidth={441}>{"Lectus lacus hendrerit morbi\nlectus eget orci nisi platea. Quis\nmi nisi ut integer. Lorem lacus\nbibendum turpis arcu."}</Text>
      </Place>
      <Place x={1358.2} y={358.9}>
        <Text size={24.7} weight={500} color="#000000" leading={1.32} maxWidth={441}>{"Lectus lacus hendrerit morbi\nlectus eget orci nisi platea. Quis\nmi nisi ut integer. Lorem lacus\nbibendum turpis arcu."}</Text>
      </Place>
      <Place x={731.2} y={599.4}>
        <Text size={51.6} weight={700} color="#0052FF" leading={1.14} maxWidth={200}>{"04"}</Text>
      </Place>
      <Place x={1358.2} y={599.4}>
        <Text size={51.6} weight={700} color="#0052FF" leading={1.14} maxWidth={200}>{"05"}</Text>
      </Place>
      <Place x={731.2} y={693.1}>
        <Text size={33.9} weight={700} color="#000000" leading={1.32} maxWidth={362}>{"Clique para editar"}</Text>
      </Place>
      <Place x={1358.2} y={693.1}>
        <Text size={33.9} weight={700} color="#000000" leading={1.32} maxWidth={362}>{"Clique para editar"}</Text>
      </Place>
      <Place x={731.2} y={763.1}>
        <Text size={24.7} weight={500} color="#000000" leading={1.32} maxWidth={441}>{"Lectus lacus hendrerit morbi\nlectus eget orci nisi platea. Quis\nmi nisi ut integer. Lorem lacus\nbibendum turpis arcu."}</Text>
      </Place>
      <Place x={1358.2} y={763.1}>
        <Text size={24.7} weight={500} color="#000000" leading={1.32} maxWidth={441}>{"Lectus lacus hendrerit morbi\nlectus eget orci nisi platea. Quis\nmi nisi ut integer. Lorem lacus\nbibendum turpis arcu."}</Text>
      </Place>
    </Slide>
  );
}
