export interface Repository {
  id: number;
  name: string;
  stargazers_count: number;
  forks_count: number;
  url: string;
}

export interface Organization {
  id: number;
  login: string;
  url: string;
  avatar_url: string;
}
