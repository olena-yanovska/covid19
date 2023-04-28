import React from "react";
import { NavLink } from "react-router-dom";

export const MyNavLink = React.forwardRef<any, any>((props, ref) => (
  <NavLink
    ref={ref}
    to={props.to}
    className={({ isActive }) => (isActive ? props.className + ' Mui-selected' : props.className)}
  >
    {props.children}
  </NavLink>
));