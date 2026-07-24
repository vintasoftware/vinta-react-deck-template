import { Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 46" };

// Faithful reproduction of the official template's Slide 46.
export default function Slide46() {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={1920} h={1080}><Photo src="img-a2ee98ebef.png" /></Place>
      <Place x={860.16} y={903.65} w={199.68} h={45.76}><Photo src="img-1e0de2cc8d.png" /></Place>
      <Place x={0} y={430.3} w={1920}>
        <Text size={124.8} weight={700} color="#FFFFFF" align="center" leading={1.14}>{"Thank you!"}</Text>
      </Place>
      <Place x={235} y={690.7}>
        <Text size={33.9} weight={700} color="#FFFFFF" leading={1.32} maxWidth={394}>{"contact@vinta.com"}</Text>
      </Place>
      <Place x={804} y={690.7}>
        <Text size={33.9} weight={700} color="#FFFFFF" leading={1.32} maxWidth={465}>{"outra forma de contato"}</Text>
      </Place>
      <Place x={1419} y={690.7}>
        <Text size={33.9} weight={700} color="#FFFFFF" leading={1.32} maxWidth={257}>{"vinta.com.br"}</Text>
      </Place>
    </Slide>
  );
}
