import { Photo, Place, Slide, Text } from "@/lib";

export const meta = { title: "Slide 23" };

// Faithful reproduction of the official template's Slide 23.
export default function Slide23() {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={130.07} h={132.78}><Photo src="img-c2ae468178.png" /></Place>
      <Place x={94.61} y={239.23} w={1109.63} h={686.11}><Photo src="img-d39c35de48.png" /></Place>
      <Place x={1691.95} y={0} w={114.09} h={113.46}><Photo src="img-6866879b7e.png" /></Place>
      <Place x={1805.65} y={0.05} w={114.33} h={113.32}><Photo src="img-54d336f9bc.png" /></Place>
      <Place x={1805.65} y={113.38} w={114.35} h={113.74}><Photo src="img-a8a2646f09.png" /></Place>
      <Place x={1578.07} y={0} w={114.01} h={113.49}><Photo src="img-8f485ac52f.png" /></Place>
      <Place x={1314} y={338.2}>
        <Text size={71} weight={700} color="#000000" leading={1.14} maxWidth={487}>{"Clique para\neditar"}</Text>
      </Place>
      <Place x={580} y={351.5}>
        <Text size={24.2} weight={500} color="#FFFFFF" leading={1.32} maxWidth={205}>{"$100,000 USD"}</Text>
      </Place>
      <Place x={388.7} y={483.3}>
        <Text size={24.2} weight={500} color="#FFFFFF" leading={1.32} maxWidth={200}>{"$64,000 USD"}</Text>
      </Place>
      <Place x={1314} y={564.2}>
        <Text size={24.2} weight={500} color="#000000" leading={1.32} maxWidth={510}>{"Lectus enim adipiscing suspendisse\nviverra cras facilisi blandit scelerisque\nfacilisis vel porta quisque cursus\nvulputate gravida interdum mollis ac\nvarius consectetu."}</Text>
      </Place>
      <Place x={321.5} y={622.3}>
        <Text size={24.2} weight={500} color="#FFFFFF" leading={1.32} maxWidth={200}>{"$48,000 USD"}</Text>
      </Place>
      <Place x={207.3} y={749.1}>
        <Text size={24.2} weight={500} color="#FFFFFF" leading={1.32} maxWidth={200}>{"$25,000 USD"}</Text>
      </Place>
    </Slide>
  );
}
