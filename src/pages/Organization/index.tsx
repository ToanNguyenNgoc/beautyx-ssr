import { OrgProvider } from "context";
import Home from "./Home";

function Organization() {
  return (
    <OrgProvider>
      <Home />
    </OrgProvider>
  );
}

export default Organization;