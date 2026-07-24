import { Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 48" };

// Faithful reproduction of the official template's Slide 48.
export default function Slide48() {
  return (
    <Slide bg="blue-section" pad={false}>
      <Place x={-6.19} y={0} w={1932.38} h={1080}><Photo src="img-f316592b6d.png" /></Place>
      <Place x={101} y={254.8}>
        <Text size={129.1} weight={700} color="#FFFFFF" leading={1.14} maxWidth={860}>{"Thank you!\nLet’s do\nthis!"}</Text>
      </Place>
      <Place x={101} y={908.6}>
        <Text size={16.1} weight={400} color="#FFFFFF" leading={1.32} maxWidth={200}>{"Email"}</Text>
      </Place>
      <Place x={1047} y={908.6}>
        <Text size={16.1} weight={400} color="#FFFFFF" leading={1.32} maxWidth={200}>{"outro"}</Text>
      </Place>
      <Place x={1730} y={908.6}>
        <Text size={16.1} weight={400} color="#FFFFFF" leading={1.32} maxWidth={200}>{"outro"}</Text>
      </Place>
      <Place x={101} y={949}>
        <Text size={24.2} weight={500} color="#FFFFFF" leading={1.32} maxWidth={289}>{"Contact@vinta.com"}</Text>
      </Place>
      <Place x={1047} y={949}>
        <Text size={24.2} weight={500} color="#FFFFFF" leading={1.32} maxWidth={200}>{"outro"}</Text>
      </Place>
      <Place x={1730} y={949}>
        <Text size={24.2} weight={500} color="#FFFFFF" leading={1.32} maxWidth={200}>{"outro"}</Text>
      </Place>
    </Slide>
  );
}
