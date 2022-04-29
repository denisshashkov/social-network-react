import React from "react";
import styles from "./button.module.scss";

function Button({ children, ...props }) {
  return (
    <div>
      <button {...props} className={styles.button}>
        {children}
      </button>
    </div>
  );
}

export default Button;
