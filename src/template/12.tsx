import { Photo, Place, Shape, Slide, Text } from "@/lib";

export const meta = { title: "Slide 12" };

// Faithful reproduction of the official template's Slide 12.
export default function Slide12() {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={1920} h={1080}><Photo src="img-b0b2a55a5f.png" /></Place>
      <Place x={990.73} y={255.69} w={267} h={164}><Photo src="img-7f082302ab.png" /></Place>
      <Place x={990.73} y={555.44} w={279} h={164}><Photo src="img-fd6672213e.png" /></Place>
      <Place x={1427.73} y={255.69} w={212} h={164}><Photo src="img-42a3ff017b.png" /></Place>
      <Place x={1427.73} y={555.44} w={342} h={164}><Photo src="img-0ea3b70290.png" /></Place>
      <Place x={106} y={264.07} w={565} h={447}><Photo src="img-fee6f42770.png" /></Place>
      <Place x={1668.67} y={959.41} w={125.62} h={126}><Shape n={4} fit="cover" /></Place>
      <Place x={1794} y={959.22} w={126} h={126.19}><Shape n={8} fit="cover" /></Place>
      <Place x={1794.32} y={834.52} w={125.67} h={124.96}><Shape n={19} fit="cover" /></Place>
      <Place x={1823.52} y={834.52} w={66.68} h={29.18}><Photo src="img-28ba267fe3.png" /></Place>
      <Place x={986} y={282.6}>
        <Text size={93.6} weight={700} color="#000000" leading={1.14} maxWidth={269}>{"200+"}</Text>
      </Place>
      <Place x={1423} y={282.6}>
        <Text size={93.6} weight={700} color="#000000" leading={1.14} maxWidth={205}>{"85+"}</Text>
      </Place>
      <Place x={104} y={284.5}>
        <Text size={71} weight={700} color="#FFFFFF" leading={1.14} maxWidth={441}>{"Texto aqui"}</Text>
      </Place>
      <Place x={986} y={394.7}>
        <Text size={24.2} weight={500} color="#000000" leading={1.32} maxWidth={272}>{"Worldwide offices."}</Text>
      </Place>
      <Place x={1423} y={394.7}>
        <Text size={24.2} weight={500} color="#000000" leading={1.32} maxWidth={200}>{"Team\nmembers"}</Text>
      </Place>
      <Place x={101} y={427.4}>
        <Text size={26.9} weight={500} color="#FFFFFF" leading={1.32} maxWidth={558}>{"Iaculis scelerisque nisl nisl ut etiam\neget interdum tortor enim enim quis\npurus orci eget est elit orci tempus sit\nfringilla porttitor lacinia vitae."}</Text>
      </Place>
      <Place x={986} y={582.4}>
        <Text size={93.6} weight={700} color="#000000" leading={1.14} maxWidth={301}>{"+10M"}</Text>
      </Place>
      <Place x={1423} y={582.4}>
        <Text size={93.6} weight={700} color="#000000" leading={1.14} maxWidth={353}>{"+500K"}</Text>
      </Place>
      <Place x={101} y={627.4}>
        <Text size={26.9} weight={500} color="#FFFFFF" leading={1.32} maxWidth={539}>{"accumsan auctor sit ornare tempor\nlectus volutpat id mauris nullam\nvenenatis rutrum adipiscing egestas\nviverra quis morbi leo pretium libero\nvelit nulla eget et ornare gravida."}</Text>
      </Place>
      <Place x={986} y={694.4}>
        <Text size={24.2} weight={500} color="#000000" leading={1.32} maxWidth={205}>{"Capital raised"}</Text>
      </Place>
      <Place x={1423} y={694.4}>
        <Text size={24.2} weight={500} color="#000000" leading={1.32} maxWidth={200}>{"Active users"}</Text>
      </Place>
    </Slide>
  );
}
