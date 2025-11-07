import React, { forwardRef } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { cn } from "@/lib/utils"; // <-- make sure this utility exists

const NavLink = forwardRef((props, ref) => {
  const { className, activeClassName, pendingClassName, to, ...rest } = props;

  return (
    <RouterNavLink
      ref={ref}
      to={to}
      className={({ isActive, isPending }) =>
        cn(
          className,
          isActive && activeClassName,
          isPending && pendingClassName
        )
      }
      {...rest}
    />
  );
});

NavLink.displayName = "NavLink";

export { NavLink };
