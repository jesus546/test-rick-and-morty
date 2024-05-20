import { SwipeableDrawer } from "@mui/material";

import React, { Fragment } from "react";
import useWindow from "../../hooks/useWindows";
type InDraweCondition = {
  children?: React.ReactNode;
  openDrawer: boolean;
  setOpenDrawer: (value: boolean) => void;
};

const DrawerCondition: React.FC<InDraweCondition> = ({
  children,
  openDrawer,
  setOpenDrawer,
}) => {
  const { width} = useWindow();
  return (
    <Fragment>
      {width <= 768 ? (
        <SwipeableDrawer
          anchor="right"
          PaperProps={{
            sx: { width: "100%" },
          }}
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          onOpen={() => setOpenDrawer(true)}
        >
          {children}
        </SwipeableDrawer>
      ) : (
        <Fragment> {children ? children : <></>}</Fragment>
      )}
    </Fragment>
  );
};

export default DrawerCondition;
