import React from "react";
import classnames from "classnames";
import styles from "./OrgItem.module.css";
import { Organization } from "../../types";

interface Props {
  org: Organization;
  className?: string;
}

const OrgItem: React.FC<Props> = ({ org, className }) => {
  return (
    <div key={org.id} className={classnames(styles.container, className)}>
      <img src={org.avatar_url} className={styles.img} alt={org.login} />
      <div>{org.login}</div>
    </div>
  );
};

export default OrgItem;
