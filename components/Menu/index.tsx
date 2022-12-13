import MenuIcon from "@/icons/MenuIcon";
import SearchIcon from "@/icons/SearchIcon";
import { currentKitAtom } from "@/state";
import { AnimatePresence, motion } from "framer-motion";
import { useAtomValue } from "jotai";
import { FC, useEffect, useState } from "react";
import Input from "../Input";

type MenuProps = {
  active?: boolean;
};

const Menu: FC<MenuProps> = ({ active: activeProps = false }) => {
  const [active, setActive] = useState<boolean>(activeProps);
  const [query, setQuery] = useState<string>("");
  const currentKit = useAtomValue(currentKitAtom);

  useEffect(() => {
    if (active) setQuery("");
  }, [active]);

  return (
    <div className="relative">
      <AnimatePresence>
        {active && (
          <motion.div
            className="absolute inset-x-0 bottom-14 flex flex-col gap-4 rounded bg-white p-4 min-w-[350px] shadow-[0px_6px_8px_-3px_#EEEEEE]"
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 3 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-dark-blue text-[20px] font-[DobraMedium] font-medium">
              List of questions
            </span>
            <Input
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              trailingIcon={<SearchIcon className="fill-coolblue" />}
              autoFocus
            />
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setActive((s) => !s)}
        className="transition flex justify-center items-center rounded bg-dark-blue w-14 h-12 shadow-[inset_0px_-2px_0px_#19457E] hover:bg-evening-blue hover:shadow-[inset_0px_-2px_0px_#003366]"
      >
        <MenuIcon className="fill-white" />
      </button>
    </div>
  );
};

export default Menu;
