import { Switch } from "react-router-dom";
import React, { Fragment } from "react";

// react-router doesn't have support for React fragments in <Switch />. This component
// wraps react-router's <Switch /> so that it gets fragment support.
//
// https://github.com/ReactTraining/react-router/issues/5785

function flatten(target, children) {
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === Fragment) {
        flatten(target, child.props.children);
      } else {
        target.push(child);
      }
    }
  });
}
/* eslint prefer-spread: "warn" */
export default function FragmentSupportingSwitch({ children }) {
  const flattenedChildren = [];
  flatten(flattenedChildren, children);
  return React.createElement.apply(
    React,
    [Switch, null].concat(flattenedChildren)
  );
}
