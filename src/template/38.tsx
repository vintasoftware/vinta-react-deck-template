import { CodeBlock, Place, Shape, Slide, Text } from "@/lib";

export const meta = { title: "Slide 38" };

// Faithful reproduction of the official template's Slide 38.
export default function Slide38() {
  return (
    <Slide bg="white" pad={false}>
      <Place x={1847.2} y={145.26} w={72.8} h={72.6}><Shape n={10} fit="cover" flipX flipY /></Place>
      <Place x={1767.25} y={0} w={152.67} h={151.77}><Shape n={20} fit="cover" flipX flipY /></Place>
      <Place x={101} y={190} w={1181.3} h={807.5}>
        <CodeBlock theme="dark" language="js" fontSize={27} code={"const pluckDeep = key => obj => key.split('.').reduce((accum, key) => accum[key], obj)\n\nconst compose = (...fns) => res => fns.reduce((accum, next) => next(accum), res)\n\nconst unfold = (f, seed) => {\n  const go = (f, seed, acc) => {\n    const res = f(seed)\n    return res ? go(f, res[1], acc.concat([res[0]])) : acc\n  }\n  return go(f, seed, [])\n}"} />
      </Place>
      <Place x={101} y={55.3}>
        <Text size={51.6} weight={700} color="#FFFFFF" leading={1.14} maxWidth={832}>{"Título aqui e código abaixo"}</Text>
      </Place>
      <Place x={1440} y={318.3}>
        <Text size={32.3} weight={700} color="#000000" leading={1.32} maxWidth={312}>{"Inserir tópicos ou\nfrase"}</Text>
      </Place>
      <Place x={1440} y={469.5}>
        <Text size={32.3} weight={700} color="#000000" leading={1.32} maxWidth={312}>{"Inserir tópicos ou\nfrase"}</Text>
      </Place>
      <Place x={1440} y={620.7}>
        <Text size={32.3} weight={700} color="#000000" leading={1.32} maxWidth={312}>{"Inserir tópicos ou\nfrase"}</Text>
      </Place>
      <Place x={1440} y={771.9}>
        <Text size={32.3} weight={700} color="#000000" leading={1.32} maxWidth={312}>{"Inserir tópicos ou\nfrase"}</Text>
      </Place>
    </Slide>
  );
}
