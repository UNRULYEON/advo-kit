import Dropdown, { Item } from "@components/Dropdown";
import { useKitContext } from "@components/KitContext";

const KitDropdown = () => {
  const { kits, currentKit, setCurrentKit } = useKitContext();

  const kitItems: Item[] = kits.map((kit) => ({
    id: kit.id,
    name: kit.name,
  }));

  const currentItem: Item = {
    id: currentKit.id,
    name: currentKit.name,
  };

  const handleOnClick = (item: Item) => {
    const kit = kits.find((kit) => kit.id === item.id);
    if (kit) setCurrentKit(kit);
  };

  return (
    <Dropdown
      label="Choose your kit"
      handleOnClick={handleOnClick}
      currentItem={currentItem}
      items={kitItems}
    />
  );
};

export default KitDropdown;
