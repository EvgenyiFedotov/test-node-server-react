import React, { FC, useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import { getSide } from "./get-side";
import { initialState } from "./initial-state";

const side = getSide();

type Props = {
  basename?: string;
};

export const CommonRouter: FC<Props> = (props) => {
  const { basename, children } = props;

  if (side === "node") {
    const initial = useContext(initialState);
    const location = initial.get("location") ?? "";

    return (
      <StaticRouter basename={basename} location={location}>
        {children}
      </StaticRouter>
    );
  } else if (side === "browser") {
    return (
      <BrowserRouter basename={basename}>
        {children}
      </BrowserRouter>
    );
  }

  return null;
};
