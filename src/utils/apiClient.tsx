const GITHUB_API_KEY = process.env.REACT_APP_GITHUB_API_KEY;

const apiClient = async (
  input: RequestInfo,
  init?: RequestInit | undefined
) => {
  const response = await fetch(input, {
    ...init,
    headers: { ...init?.headers, Authorization: `token ${GITHUB_API_KEY}` },
  });
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    return Promise.reject(response);
  }
};

export default apiClient;
