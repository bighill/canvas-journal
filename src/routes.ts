import AlphaCircle from "./journal/AlphaCircle/AlphaCircle";
import BravoDots from "./journal/BravoDots/BravoDots";

interface Route {
  title: string;
  component: () => JSX.Element;
}

const routes: Route[] = [
  { title: "A. Circle", component: AlphaCircle },
  { title: "B. Dots", component: BravoDots },
  // { title: "C. Foo", component: Charlie },
  // { title: "D. Foo", component: Delta },
  // { title: "E. Foo", component: Echo },
  // { title: "F. Foo", component: Foxtrot },
  // { title: "G. Foo", component: Golf },
  // { title: "H. Foo", component: Hotel },
  // { title: "I. Foo", component: India },
  // { title: "J. Foo", component: Juliett },
  // { title: "K. Foo", component: Kilo },
  // { title: "L. Foo", component: Lima },
  // { title: "M. Foo", component: Mike },
];

export default routes;
