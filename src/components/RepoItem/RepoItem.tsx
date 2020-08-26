import React from "react";
import classnames from "classnames";
import { ReactComponent as Star } from "../../svg/star.svg";
import { Repository } from "../../types";
import styles from "./RepoItem.module.css";

interface Props {
  repo: Repository;
  className?: string;
}

const RepoItem: React.FC<Props> = ({ repo, className }) => {
  return (
    <div key={repo.id} className={classnames(styles.container, className)}>
      <div className={styles.name}>{repo.name}</div>
      <div className={styles.stargazers}>
        {repo.stargazers_count}
        <Star className={styles.star} />
      </div>
    </div>
  );
};

export default RepoItem;
