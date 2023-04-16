import { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/user";
import { useParams } from "react-router-dom";
import "./App.css";

import PostCard from "./PostCard";
import PostForm from "./PostForm";

export default function Posts({
  areas,
  addProtocol,
  deleteProtocol,
  handleEditProtocol,
  errorsList,
}) {
  const [currentArea, setCurrentArea] = useState({ protocols: [] });
  //   const [errorsList, setErrorsList] = useState([]);
  const { loggedIn } = useContext(UserContext);

  const params = useParams();
  const parsedId = parseInt(params.id);

  useEffect(() => {
    const foundArea = areas.find(({ id }) => id === parsedId);
    setCurrentArea(foundArea);
  }, [areas, parsedId]);

  let protocols = [];
  if (currentArea && currentArea.protocols) {
    protocols = currentArea.posts.map((protocol) => protocol);
  }

  let renderProtocols;
  if (protocols) {
    renderPosts = protocols.map((protocol) => (
      <ProtocolCard
        key={protocol.id}
        post={post}
        handleEditProtocol={handleEditProtocol}
        deleteProtocol={deleteProtocol}
      />
    ));
  }

  if (loggedIn && currentBoard && currentBoard.title) {
    return (
      <div>
        <h1 className="title">{currentBoard.title}</h1>
        <PostForm id={parsedId} addPost={addPost} errorsList={errorsList} />
        <br />
        {renderPosts}
      </div>
    );
  } else {
    return (
      <div>
        <h3>404 board not found</h3>
      </div>
    );
  }
}
