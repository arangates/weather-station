import React from "react";
import styles from "./Error.module.css";

interface IErrorItemProps {
  reason: string | null;
}

const Error: React.FC<IErrorItemProps> = ({ reason }) => {
  return (
    <div className={styles.error_container}>
      <p className={styles.emotion}>{";("}</p>
      <strong> {reason ? reason : "not connected to the interwebs."} </strong>
      <p>try again after establishing network connection</p>
    </div>
  );
};

export default Error;
