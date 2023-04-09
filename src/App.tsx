import FactSlogan from '@components/FactSlogan';
import KitBox from '@components/KitBox';
import KitContext from '@components/KitContext';
import KitDropdown from '@components/KitDropdown';
import KitMenu from '@components/KitMenu';
import ShowInstructionsButton from '@components/ShowInstructionsButton';

const App = () => {
  return (
    <KitContext>
      <main className="flex flex-col w-full h-full bg-gray-blue overflow-hidden">
        <div className="flex w-full p-3 lg:p-10 flex-col gap-2 sm:gap-0 sm:flex-row">
          <div className="sm:flex-1">
            <FactSlogan fact="Advo-kit" slogan="Think outside the box" />
          </div>
          <div className="sm:flex-1 md:max-w-[240px]">
            <KitDropdown />
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <KitBox />
        </div>
        <div className="flex w-full p-3 lg:p-10 flex-col gap-2 sm:gap-0 sm:flex-row z-10">
          <div className="flex-1">
            <KitMenu />
          </div>
          <ShowInstructionsButton />
        </div>
      </main>
    </KitContext>
  );
};

export default App;
