import Dialog, { DialogContent, DialogTitle } from '@components/Dialog';
import Dropdown, { Item } from '@components/Dropdown';
import { useKitContext } from '@components/KitContext';
import { useState } from 'react';
import toast from 'react-hot-toast';

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

    toast.success(`Deck changed to ${item.name}`);
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
        <DialogTitle closeDialog={handleCloseDialog}>Request a deck</DialogTitle>
        <DialogContent>
          Hey, can't find your deck?
          <br />
          <br />
          Request your deck by sending an email to <a href="mailto:pim.beijers@coolblue.nl">pim.beijers@coolblue.nl</a>.
          Tell us the name of the deck and provide a list of questions. And we'll make sure the deck will be added as
          soon as possible.
          <br />
          <br />
          With a smile!
        </DialogContent>
      </Dialog>
    </>
  );
};

export default KitDropdown;
