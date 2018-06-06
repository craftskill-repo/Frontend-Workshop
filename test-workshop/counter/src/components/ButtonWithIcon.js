import React from "react";

const Icon = ({ icon }) => <i className={`icon icon-${icon}`} />;
const ButtonWithIcon = ({ icon, children }) => (
  <button>
    <Icon icon={icon} />
    {children}
  </button>
);

export default ButtonWithIcon;
