import {useEffect} from "react";


document.addEventListener("keydown", handleKeyDown);

export function handleKeyDown(e: globalThis.KeyboardEvent) {
  useEffect(() => console.log(e.key));
}