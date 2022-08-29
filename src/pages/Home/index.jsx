import Greeting from "../../components/Greeting";

import Review from "../../components/Review";
// import SideMenu from "../../components/SideMenu";
import Slider from "../../components/Slider";

export function Home() {
  return (
    <div>
      <Greeting />
      <Slider />
      <Review />
    </div>
  );
}
