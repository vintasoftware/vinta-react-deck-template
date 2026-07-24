import { CodeBlock, Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 36" };

// Faithful reproduction of the official template's Slide 36.
export default function Slide36() {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={1920} h={1080}><Photo src="img-0d84f70f37.png" /></Place>
      <Place x={532.3} y={155.3} w={1230.3} h={769.4}>
        <CodeBlock theme="light" language="js" fontSize={28} code={"const pluckDeep = key => obj => key.split('.').reduce((accum, key) => accum[key], obj)\n\nconst compose = (...fns) => res => fns.reduce((accum, next) => next(accum), res)\n\nconst unfold = (f, seed) => {\n  const go = (f, seed, acc) => {\n    const res = f(seed)\n    return res ? go(f, res[1], acc.concat([res[0]])) : acc\n  }\n  return go(f, seed, [])\n}"} />
      </Place>
      <Place x={101} y={179.4}>
        <Text size={71} weight={700} color="#FFFFFF" leading={1.14} maxWidth={277}>{"Inserir\ntítulo\naqui"}</Text>
      </Place>
    </Slide>
  );
}
