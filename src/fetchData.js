import React, { useState, useEffect } from 'react';
import "./fetchData.css";


const FetchData = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);


  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);


  useEffect(() => {
    if (selectedUserId) {
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUserId}`)
        .then(response => response.json())
        .then(data => setPosts(data))
        .catch(error => console.error('Error fetching posts:', error));
    }
  }, [selectedUserId]);

 
  useEffect(() => {
    if (selectedPostId) {
      fetch(`https://jsonplaceholder.typicode.com/comments?postId=${selectedPostId}`)
        .then(response => response.json())
        .then(data => setComments(data))
        .catch(error => console.error('Error fetching comments:', error));
    }
  }, [selectedPostId]);

  return (
    <div>

      <h2>Usuários</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
           <h3> {user.name}</h3> 
            <button onClick={() => setSelectedUserId(user.id)}>Ver os post?</button>
          </li>
        ))}
      </ul>

      {posts.length > 0 && (
        <>
          <h2>Posts do Usuário {selectedUserId}</h2>
          <ul>
            {posts.map(post => (
              <li key={post.id}>
              <p className='posts'>{post.title}</p>
                <button onClick={() => setSelectedPostId(post.id)}>Ver Comentários</button>
              </li>
            ))}
          </ul>
        </>
      )}

      {comments.length > 0 && (
        <>
          <h2>Comentários do post {selectedPostId}</h2>
          <ul>
            {comments.map(comment => (
              <li key={comment.id} className='comentario'>  {comment.body} </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default FetchData;
