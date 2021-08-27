import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useMedia } from "./useMedia";

// Hook
export const useDarkMode = () => {
  const [enabledState, setEnabledState] = useLocalStorage("dark-mode-enabled", false);
  const prefersDarkMode = usePrefersDarkMode();

  const enabled = enabledState ?? prefersDarkMode;
  
  useEffect(
    () => {
      const className = "dark-mode";
      const element = window.document.body;
      if (enabled) {
        element.classList.add(className);
      } else {
        element.classList.remove(className);
      }
    },
    [enabled] // Only re-call effect when value changes
  );

  return [enabled, setEnabledState];
}

function usePrefersDarkMode() {
  return useMedia<boolean>(["(prefers-color-scheme: dark)"], [true], false);
}





// Usage
// function App() {
//   const [darkMode, setDarkMode] = useDarkMode();
//   return (
//     <div>
//       <div className="navbar">
//         <Toggle darkMode={darkMode} setDarkMode={setDarkMode} />
//       </div>
//       <Content />
//     </div>
//   );
// }