import { useKitContext } from '@components/KitContext';

const ResetPreferencesButton = () => {
  const { firstLaunch, setFirstLaunch } = useKitContext();

  return (
    <button className="font-bold text-coolblue hover:underline" onClick={() => setFirstLaunch(true)}>
      Reset preferences
    </button>
  );
};

export default ResetPreferencesButton;