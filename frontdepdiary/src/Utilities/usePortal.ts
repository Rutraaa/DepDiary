import React, {useEffect, useRef} from "react";

export function usePortal(id: string): HTMLElement {
  const rootElemRef = useRef(document.createElement("div"));

  useEffect(() => {
    // Look for existing target DOM element to append to
    const parentElem = document.querySelector(`#${id}`);
    if (parentElem) {
      // Add the detached element to the parent
      parentElem.appendChild(rootElemRef.current);
    }

    // This function is run on unmount
    return () => {
      rootElemRef.current.remove();
    };
  }, [id]);

  return rootElemRef.current;
}
