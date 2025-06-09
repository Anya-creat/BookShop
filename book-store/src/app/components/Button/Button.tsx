import { ButtonHTMLAttributes } from "react";
import style from "./style.module.css";

type ValueButtonType = {
  value: string;
} & ButtonHTMLAttributes<HTMLButtonElement>

const BigButton = (props: ValueButtonType) => {
  return (
    <button type={props.type}
      className={style.bigButton}
      onClick={(e) => {
        props.onClick?.(e);
        // if(props.onClick) {
        //     props.onClick()
        // }
      }}
    >
      {props.value}
    </button>
  );
};

export default BigButton;