import { Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 21" };

// Faithful reproduction of the official template's Slide 21.
export default function Slide21() {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={1920} h={1080}><Photo src="img-34260598bb.png" /></Place>
      <Place x={1143} y={300} w={776} h={780}><Photo src="img-9374d01d1d.png" /></Place>
      <Place x={101} y={326.9}>
        <Text size={93.6} weight={700} color="#FFFFFF" leading={1.14} maxWidth={639}>{"Clique para\neditar"}</Text>
      </Place>
      <Place x={101} y={603.7}>
        <Text size={26.9} weight={500} color="#FFFFFF" leading={1.32} maxWidth={619}>{"Lorem ipsum dolor sit amet consectetur\nadipiscing elit etiam nec suscipit dui sed\ncursus nibh id risus ultrices convallis\nphasellus vel tristique diam nam placerat."}</Text>
      </Place>
    </Slide>
  );
}
