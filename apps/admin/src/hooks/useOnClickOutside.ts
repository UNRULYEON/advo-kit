import { RefObject, ForwardedRef, useEffect } from "react";

const useOnClickOutside = (
  ref: RefObject<HTMLDivElement> | ForwardedRef<HTMLDivElement>,
  handler: (event: Event) => void
) => {
  useEffect(() => {
    const listener: EventListener = (event) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - awdddawdad
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      if (!ref.current || ref.current.contains(event.target as Node)) return;

      handler(event);
    };

    document.addEventListener("mouseup", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mouseup", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
