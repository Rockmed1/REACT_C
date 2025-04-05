import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  //to implement the close modal window when there is a click outside:
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        // console.log("click outside modal window");
        handler();
      }
    }
    // true here is to make the event listener listen not on the capturing/bubbling phase but while the event is moving down the DOM tree
    document.addEventListener("click", handleClick, true);
    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [handler, listenCapturing]);

  return ref;
}
