import React, { useState, useCallback, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import styles from "./Main.module.css";
import { Repository, Organization } from "../../types";
import SearchInput from "../../components/SearchInput";
import apiClient from "../../utils/apiClient";
import { API_BASE_URL } from "../../constants";
import RepoItem from "../../components/RepoItem";
import OrgItem from "../../components/OrgItem";

const Main = () => {
  const { username } = useParams();
  const history = useHistory();

  const [inputVal, setInputVal] = useState<string>(username || "");
  const [repos, setRepos] = useState<Repository[]>([]);
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    (async () => {
      if (!username) return;

      try {
        setRepos([]);
        setOrgs([]);
        setError(undefined);
        setLoaded(false);

        const [reposData, orgsData] = await Promise.all([
          apiClient(`${API_BASE_URL}/users/${username}/repos`),
          apiClient(`${API_BASE_URL}/users/${username}/orgs`),
        ]);

        setRepos(reposData);
        setOrgs(orgsData);
        setLoaded(true);
      } catch (err) {
        if (err.status === 404) {
          setError("User not found");
        } else {
          setError("Unknown error");
        }
      }
    })();
  }, [username]);

  const handleChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputVal(e.target.value);
    },
    []
  );

  const handleSubmit = useCallback(() => {
    history.push(`/${inputVal}`);
  }, [inputVal, history]);

  return (
    <div className={styles.container}>
      <div
        className={styles.header}
        style={{ height: username ? "72px" : "50%" }}
      >
        <SearchInput
          value={inputVal}
          className={styles.search}
          onChange={handleChangeInput}
          onSubmit={handleSubmit}
          autoFocus
        />
      </div>
      {error && <div className={styles.error}>{error}</div>}
      {username && loaded && (
        <div className={styles.content}>
          <div className={styles.column}>
            <h3 className={styles.subheader}>Repositories</h3>
            <div className={styles.reposList}>
              {loaded && repos.length === 0 && (
                <div className={styles.noData}>User has no repositories</div>
              )}
              {repos.map((repo) => (
                <RepoItem key={repo.id} repo={repo} />
              ))}
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.column}>
            <h3 className={styles.subheader}>Organizations</h3>
            <div className={styles.orgsList}>
              {loaded && orgs.length === 0 && (
                <div className={styles.noData}>User has no organizations</div>
              )}
              {orgs.map((org) => (
                <OrgItem key={org.id} org={org} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
