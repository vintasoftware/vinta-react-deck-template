import { Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 19" };

// Faithful reproduction of the official template's Slide 19.
export default function Slide19() {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={1920} h={1080}><Photo src="img-e8561d1d3f.png" /></Place>
      <Place x={1827.68} y={276.98} w={92.33} h={92.33}><Photo src="img-856a1b7fa9.png" /></Place>
      <Place x={1827.68} y={0} w={92.33} h={92.33}><Photo src="img-856a1b7fa9.png" /></Place>
      <Place x={1827.18} y={276.48} w={92.54} h={92.82}><Photo src="img-67132a7b9e.png" /></Place>
      <Place x={1827.18} y={184.34} w={92.82} h={92.14}><Photo src="img-cc2c94f684.png" /></Place>
      <Place x={1827.22} y={0} w={92.78} h={92.04}><Photo src="img-893765490b.png" /></Place>
      <Place x={1827.18} y={91.83} w={92.37} h={92.78}><Photo src="img-381421d8e4.png" /></Place>
      <Place x={183.56} y={987.67} w={0} h={0}><Photo src="img-856a1b7fa9.png" /></Place>
      <Place x={460.54} y={987.67} w={0} h={0}><Photo src="img-856a1b7fa9.png" /></Place>
      <Place x={184.06} y={987.18} w={0} h={0}><Photo src="img-67132a7b9e.png" /></Place>
      <Place x={276.2} y={987.18} w={0} h={0}><Photo src="img-cc2c94f684.png" /></Place>
      <Place x={368.71} y={987.18} w={0} h={0}><Photo src="img-381421d8e4.png" /></Place>
      <Place x={92.04} y={987.22} w={0} h={0}><Photo src="img-893765490b.png" /></Place>
      <Place x={1108.2} y={218.7}>
        <Text size={33.9} weight={700} color="#0052FF" leading={1.32} maxWidth={200}>{"01"}</Text>
      </Place>
      <Place x={1224.2} y={218.7}>
        <Text size={33.9} weight={700} color="#000000" leading={1.32} maxWidth={362}>{"Clique para editar"}</Text>
      </Place>
      <Place x={1224.2} y={275.6}>
        <Text size={26.9} weight={500} color="#000000" leading={1.32} maxWidth={539}>{"In nulla ultrices ipsum mus elit\nscelerisque fermentum tortor cursus\nmorbi tellus ornare."}</Text>
      </Place>
      <Place x={130} y={352.1}>
        <Text size={64.5} weight={700} color="#0052FF" leading={1.14} maxWidth={683}>{"Clique para editar"}</Text>
      </Place>
      <Place x={1108.2} y={457.6}>
        <Text size={33.9} weight={700} color="#0052FF" leading={1.32} maxWidth={200}>{"02"}</Text>
      </Place>
      <Place x={1224.2} y={457.6}>
        <Text size={33.9} weight={700} color="#000000" leading={1.32} maxWidth={362}>{"Clique para editar"}</Text>
      </Place>
      <Place x={130} y={460.2}>
        <Text size={27} weight={700} color="#000000" leading={1.32} maxWidth={600}>{"Lorem ipsum dolor sit amet, consectetur"}</Text>
      </Place>
      <Place x={130} y={500.2}>
        <Text size={26.9} weight={500} color="#000000" leading={1.32} maxWidth={706}>{"adipiscing elit etiam nec suscipit dui sed cursus\nnibh id risus ultrices convallis phasellus vel\ntristique diam ham placerat aliquet libero a\naliquam nisl accumsan eget etiam ultrices."}</Text>
      </Place>
      <Place x={1224.2} y={514.6}>
        <Text size={26.9} weight={500} color="#000000" leading={1.32} maxWidth={539}>{"In nulla ultrices ipsum mus elit\nscelerisque fermentum tortor cursus\nmorbi tellus ornare."}</Text>
      </Place>
      <Place x={1108.2} y={696.6}>
        <Text size={33.9} weight={700} color="#0052FF" leading={1.32} maxWidth={200}>{"03"}</Text>
      </Place>
      <Place x={1224.2} y={696.6}>
        <Text size={33.9} weight={700} color="#000000" leading={1.32} maxWidth={362}>{"Clique para editar"}</Text>
      </Place>
      <Place x={1224.2} y={753.6}>
        <Text size={26.9} weight={500} color="#000000" leading={1.32} maxWidth={539}>{"In nulla ultrices ipsum mus elit\nscelerisque fermentum tortor cursus\nmorbi tellus ornare."}</Text>
      </Place>
    </Slide>
  );
}
