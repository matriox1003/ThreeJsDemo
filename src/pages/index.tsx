import { useMount } from "ahooks";
import Page from "./Charts";
import ThreeDemo from "./ThreeDemo";
import Vertex from "./Vertex";


export default function HomePage() {

  useMount(() => {
    
  });

  return (
    <div>
      {/* <Vertex></Vertex> */}
      <ThreeDemo />
      {/* <Page /> */}
    </div>
  );
}
