import React from "react";
import style from "./errorComponent.module.scss";

function ErrorComponent() {
  return (
    <div className={style.error}>
      <div className={style.error_popup}>
        <h3>OOPS something wrong!!!</h3>
      </div>
    </div>
  );
}

export default ErrorComponent;
