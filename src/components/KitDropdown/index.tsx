import Dialog from '@components/Dialog';
import Dropdown, { Item } from '@components/Dropdown';
import { useKitContext } from '@components/KitContext';
import { useState } from 'react';

const requestFeature: Item = {
  id: 'request-decj',
  name: 'Request a deck',
};

const KitDropdown = () => {
  const { kits, currentKit, setCurrentKit } = useKitContext();
  const [requestFeatureDialogOpen, setRequestFeatureDialogOpen] = useState(false);

  const kitItems: Item[] = kits.map((kit) => ({
    id: kit.id,
    name: kit.name,
  }));

  const currentItem: Item = {
    id: currentKit.id,
    name: currentKit.name,
  };

  const handleOnClick = (item: Item) => {
    if (item.id === requestFeature.id) return setRequestFeatureDialogOpen(true);

    const kit = kits.find((kit) => kit.id === item.id);
    if (kit) setCurrentKit(kit);
  };

  const handleCloseDialog = () => {
    setRequestFeatureDialogOpen(false);
  };

  return (
    <>
      <Dropdown
        label="Choose your kit"
        handleOnClick={handleOnClick}
        currentItem={currentItem}
        items={[...kitItems, requestFeature]}
      />
      <Dialog open={requestFeatureDialogOpen} HandleCloseDialog={handleCloseDialog}>
        Request a deck!
      </Dialog>
    </>
  );
};

export default KitDropdown;
