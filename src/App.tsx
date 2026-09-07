import { Deck } from "@/components/deck/Deck";
import { PrintSheet } from "@/components/deck/PrintSheet";
import { SLIDES } from "@/data/slides";
import { PRINT } from "@/lib/print";

export function App() {
  if (PRINT) return <PrintSheet slides={SLIDES} />;
  return <Deck slides={SLIDES} />;
}

export default App;
