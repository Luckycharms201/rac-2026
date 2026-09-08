import { Deck } from "@/components/deck/Deck";
import { SLIDES } from "@/data/slides";

export function App() {
  return <Deck slides={SLIDES} />;
}

export default App;
