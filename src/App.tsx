import KitContext from "@components/KitContext";
import Menu from "@components/Menu";

const App = () => {
  return (
    <KitContext>
      <span className="block h-[800px]">hello world</span>
      <Menu />
    </KitContext>
  );
};

export default App;
