import { CodeBlock, Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 41" };

// Faithful reproduction of the official template's Slide 41.
export default function Slide41() {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={1920} h={1080}><Photo src="img-7cfded07c9.png" /></Place>
      <Place x={643.06} y={0} w={109} h={108.55}><Photo src="img-16976e8428.png" /></Place>
      <Place x={885.1} y={148.2} w={948.1} h={832.8}>
        <CodeBlock theme="dark" language="js" fontSize={22} code={"const pluckDeep = key => obj => key.split('.').reduce((accum, key) => accum[key], obj)\n\nconst compose = (...fns) => res => fns.reduce((accum, next) => next(accum), res)\n\nconst unfold = (f, seed) => {\n  const go = (f, seed, acc) => {\n    const res = f(seed)\n    return res ? go(f, res[1], acc.concat([res[0]])) : acc\n  }\n  return go(f, seed, [])\n}"} />
      </Place>
      <Place x={106.1} y={284.5}>
        <Text size={71} weight={700} color="#000000" leading={1.14} maxWidth={452}>{"Título aqui"}</Text>
      </Place>
      <Place x={101} y={411.4}>
        <Text size={26.9} weight={500} color="#000000" leading={1.32} maxWidth={558}>{"Iaculis scelerisque nisl nisl ut etiam\neget interdum tortor enim enim quis\npurus orci eget est elit orci tempus sit\nfringilla porttitor lacinia vitae."}</Text>
      </Place>
      <Place x={101} y={611.4}>
        <Text size={26.9} weight={500} color="#000000" leading={1.32} maxWidth={539}>{"accumsan auctor sit ornare tempor\nlectus volutpat id mauris nullam\nvenenatis rutrum adipiscing egestas\nviverra quis morbi leo pretium libero\nvelit nulla eget et ornare gravida."}</Text>
      </Place>
    </Slide>
  );
}
