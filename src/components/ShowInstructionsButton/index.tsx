import { useKitContext } from '@components/KitContext';

const ShowInstructionsButton = () => {
  const { setFirstLaunch, setIsBoxOpen } = useKitContext();

  const handleOnClick = () => {
    setFirstLaunch(true);
    setIsBoxOpen(true);
  };

  return (
    <button className="font-bold text-coolblue hover:underline" onClick={handleOnClick}>
      Show instructions
    </button>
  );
};

export default ShowInstructionsButton;
