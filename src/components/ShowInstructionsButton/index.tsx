import { useKitContext } from '@components/KitContext';

const ShowInstructionsButton = () => {
  const { firstLaunch, setFirstLaunch } = useKitContext();

  return (
    <button className="font-bold text-coolblue hover:underline" onClick={() => setFirstLaunch(true)}>
      Show instructions
    </button>
  );
};

export default ShowInstructionsButton;
