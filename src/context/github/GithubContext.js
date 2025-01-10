import { createContext, useState } from "react";

const GithubContext = createContext();

// 프로바이더가 전역으로 컨텍스트를 적용함
export const GithubProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [repos, setRepos] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  // 키워드로 유저 리스트
  const searchUsers = (text) => {
    setLoading(true);
    const params = new URLSearchParams({ q: text });
    const response = fetch(
      `${process.env.REACT_APP_GITHUB_URL}/search/users?${params}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.items);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  // 깃허브 아이디로 유저 찾기
  const getUser = (login) => {
    setLoading(true);

    const response = fetch(
      `${process.env.REACT_APP_GITHUB_URL}/users/${login}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => (window.location = "/notfound"));
    getRepository(login);
  };

  // 유저들 클리어
  const clearUser = () => {
    setUsers([]);
  };

  // 공개 리포지토리
  const getRepository = (login) => {
    setLoading(true);
    const params = new URLSearchParams({
      sort: "created",
      per_page: 10,
    });
    const response = fetch(
      `${process.env.REACT_APP_GITHUB_URL}/users/${login}/repos?${params}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setRepos(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <GithubContext.Provider
      value={{
        users,
        loading,
        searchUsers,
        getUser,
        user,
        clearUser,
        repos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
export default GithubContext;
