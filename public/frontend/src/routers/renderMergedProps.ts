import { createElement } from "react";

export default function renderMergedProps(component: any, ...rest: any) {
  const finalProps = Object.assign({}, ...rest);

  return createElement(component, finalProps);
}