import React, { useContext, useState } from "react";
import GithubContext from "../../context/github/GithubContext";

const UserSearch = ({ handleAlert }) => {
  const [text, setText] = useState("");

  const { searchUsers, clearUser } = useContext(GithubContext);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text === "") {
      handleAlert("내용을 입력해주세요");
    } else {
      //유저찾기
      searchUsers(text);
      setText("");
    }
  };
  return (
    <div
      className="grid grid-cols-1 xl:grid-cols-2 
    lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8"
    >
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                onChange={handleChange}
                value={text}
                type="text"
                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                placeholder="Search"
              />
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      <div>
        <button onClick={clearUser} className="btn btn-ghost btn-lg">
          Clear
        </button>
      </div>
    </div>
  );
};

export default UserSearch;
