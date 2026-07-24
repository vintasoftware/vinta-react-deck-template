import { CodeBlock, Place, Shape, Slide, Text } from "@/lib";

export const meta = { title: "Slide 39" };

// Faithful reproduction of the official template's Slide 39.
export default function Slide39() {
  return (
    <Slide bg="white" pad={false}>
      <Place x={1776.38} y={936.95} w={143.46} h={142.87}><Shape n={1} fit="cover" /></Place>
      <Place x={1632.55} y={936.87} w={143.9} h={143.13}><Shape n={9} fit="cover" /></Place>
      <Place x={1776.42} y={794.24} w={143.58} h={142.73}><Shape n={20} fit="cover" /></Place>
      <Place x={148.1} y={57.8} w={1050.1} h={922.3}>
        <CodeBlock theme="dark" language="js" fontSize={24} code={"const pluckDeep = key => obj => key.split('.').reduce((accum, key) => accum[key], obj)\n\nconst compose = (...fns) => res => fns.reduce((accum, next) => next(accum), res)\n\nconst unfold = (f, seed) => {\n  const go = (f, seed, acc) => {\n    const res = f(seed)\n    return res ? go(f, res[1], acc.concat([res[0]])) : acc\n  }\n  return go(f, seed, [])\n}"} />
      </Place>
      <Place x={1293} y={308.9}>
        <Text size={64.5} weight={700} color="#0052FF" leading={1.14} maxWidth={461}>{"Título tela\npara código"}</Text>
      </Place>
      <Place x={1293} y={507.3}>
        <Text size={32.3} weight={700} color="#000000" leading={1.32} maxWidth={466}>{"subtítulo ou complemento"}</Text>
      </Place>
    </Slide>
  );
}
