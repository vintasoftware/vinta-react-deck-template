import { Photo, Place, Slide } from "@/lib";

export const meta = { title: "Slide 31" };

// Faithful reproduction of the official template's Slide 31.
export default function Slide31() {
  return (
    <Slide bg="white" pad={false}>
      <Place x={0} y={0} w={1920} h={1080}><Photo src="img-65d1c7ad5a.png" /></Place>
      <Place x={87} y={106} w={408} h={369}><Photo src="img-952e7b4283.png" /></Place>
      <Place x={87} y={504} w={408} h={369}><Photo src="img-952e7b4283.png" /></Place>
      <Place x={533} y={106} w={408} h={369}><Photo src="img-952e7b4283.png" /></Place>
      <Place x={533} y={504} w={408} h={369}><Photo src="img-952e7b4283.png" /></Place>
      <Place x={979} y={106} w={408} h={369}><Photo src="img-952e7b4283.png" /></Place>
      <Place x={979} y={504} w={408} h={369}><Photo src="img-952e7b4283.png" /></Place>
      <Place x={1425} y={106} w={408} h={369}><Photo src="img-952e7b4283.png" /></Place>
      <Place x={1425} y={504} w={408} h={369}><Photo src="img-952e7b4283.png" /></Place>
      <Place x={0} y={953.51} w={1285.35} h={126.49}><Photo src="img-e724e6a599.png" inner={{ x: 0, y: -592.51, w: 1411.7, h: 793.98 }} /></Place>
      <Place x={1277.32} y={953.51} w={642.68} h={126.49}><Photo src="img-e724e6a599.png" inner={{ x: 0, y: -592.51, w: 1411.7, h: 793.98 }} /></Place>
    </Slide>
  );
}
