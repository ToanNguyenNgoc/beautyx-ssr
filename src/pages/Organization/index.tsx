import { OrgProvider } from "context";
import Home from "./Home";

function Organization() {
  return (
    <OrgProvider>
      <Home />
    </OrgProvider>
    // <div
    //   style={{width:'100%', height:'2000px', padding:'78px'}}
    // >
    //   <h1>Detail</h1>
    // </div>
  );
}

export default Organization;