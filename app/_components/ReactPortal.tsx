import { useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";

const createWrapperAndAppendToBody = (wrapperId: string) => {
  if (!document) return null;
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
};

export default function ReactPortal({
  children,
  wrapperId,
}: {
  children: React.ReactElement;
  wrapperId: string;
}) {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement>();

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let SystemCreated = false;
    //if element is not found wit wrapperId or wrapperId is not provided,
    //create and append to body
    if (!element) {
      SystemCreated = true;
      element = createWrapperAndAppendToBody(wrapperId);
    }
    setWrapperElement(element!);

    return () => {
      //dlete the programatically created element
      if (SystemCreated && element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  //wrapperElement state will be null on the very first render
  if (!wrapperElement) return null;

  return createPortal(children, wrapperElement);
}
