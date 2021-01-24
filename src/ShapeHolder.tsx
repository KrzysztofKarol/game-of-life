import React from "react";
import { useDispatch } from "react-redux";
import { shapes } from "./shapes";
import { insertShape } from "./store/actions";

function ShapeHolder() {
  const dispatch = useDispatch();

  return (
    <ul>
      {shapes.map((shape, i) => (
        <li key={i.toString()} onClick={() => dispatch(insertShape(shape))}>
          <pre>{shape}</pre>
        </li>
      ))}
    </ul>
  );
}

export default ShapeHolder;
