import { useState, useEffect } from "react";

// Hook
export const useMedia = <T>(queries: string[], values: T[], defaultValue: T) => {
  const mediaQueryLists = queries.map((q) => window.matchMedia(q));
  
  const getValue = () => {
    const index = mediaQueryLists.findIndex((mql) => mql.matches);
  
    return values?.[index] || defaultValue;
  };
  const [value, setValue] = useState<T>(getValue);

  useEffect(
    () => {
      const handler = () => setValue(getValue);

      mediaQueryLists.forEach((mql) => mql.addListener(handler));
      return () => mediaQueryLists.forEach((mql) => mql.removeListener(handler));
    },
    [] 
  );
  return value;
};

// function App() {
  //   const columnCount = useMedia<number>(
  //     // Media queries
  //     ["(min-width: 1500px)", "(min-width: 1000px)", "(min-width: 600px)"],
  //     // Column counts (relates to above media queries by array index)
  //     [5, 4, 3],
  //     // Default column count
  //     2
  //   );
  //   // Create array of column heights (start at 0)
  //   let columnHeights = new Array(columnCount).fill(0);
  //   // Create array of arrays that will hold each column's items
  //   let columns = new Array(columnCount).fill().map(() => []) as Array<
  //     DataProps[]
  //   >;
  //   (data as DataProps[]).forEach((item) => {
  //     // Get index of shortest column
  //     const shortColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
  //     // Add item
  //     columns[shortColumnIndex].push(item);
  //     // Update height
  //     columnHeights[shortColumnIndex] += item.height;
  //   });
  //   // Render columns and items
  //   return (
  //     <div className="App">
  //       <div className="columns is-mobile">
  //         {columns.map((column) => (
  //           <div className="column">
  //             {column.map((item) => (
  //               <div
  //                 className="image-container"
  //                 style={{
  //                   // Size image container to aspect ratio of image
  //                   paddingTop: (item.height / item.width) * 100 + "%",
  //                 }}
  //               >
  //                 <img src={item.image} alt="" />
  //               </div>
  //             ))}
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // }