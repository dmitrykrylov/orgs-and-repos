import React, { useCallback } from "react";
import classnames from "classnames";
import styles from "./SearchInput.module.css";
import { ReactComponent as SearchIcon } from "../../svg/search.svg";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  onSubmit?: (e: React.FormEvent) => void;
}

const Input: React.FC<Props> = ({ onSubmit, ...props }) => {
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (onSubmit) {
        onSubmit(e);
      }
    },
    [onSubmit]
  );

  return (
    <form
      className={classnames(styles.container, props.className)}
      onSubmit={handleSubmit}
    >
      <input {...props} className={styles.input} placeholder="Enter username" />
      <button
        className={styles.button}
        type="submit"
        data-testid="search-submit"
      >
        <SearchIcon className={styles.icon} />
      </button>
    </form>
  );
};

export default Input;
