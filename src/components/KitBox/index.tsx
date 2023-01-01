import Box from '@components/Box';
import { useKitContext } from '@components/KitContext';
import { useState } from 'react';

const KitBox = () => {
  const { currentKit } = useKitContext();
  const [open, setOpen] = useState(false);

  const handleOnBoxButtonClick = () => setOpen((s) => !s);

  return (
    <div
      style={{
        perspective: '800px',
        perspectiveOrigin: '50% calc(50% - 225px)',
      }}
    >
      <Box open={open} buttonCallback={handleOnBoxButtonClick} boxColor="#0090E3" rotate />
    </div>
  );
};

export default KitBox;
