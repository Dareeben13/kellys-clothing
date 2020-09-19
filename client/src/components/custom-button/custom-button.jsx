import React from "react";

// import "./custom-button.scss";

import { CustomButtonContainer } from "./custom-button.styles.jsx";

function CustomButton({ children, ...props }) {
  return <CustomButtonContainer {...props}>{children}</CustomButtonContainer>;
}

export default CustomButton;
