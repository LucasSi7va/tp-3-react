import React, { useState, useEffect } from 'react';
import "./fetchData.css";


const FetchData = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState('');
  // hover do mouse
  const [showComment, setShowComment] = useState(false);

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
      <ul className='grade'>
        {users.map(user => (
          <li key={user.id} className='NomeUsuario' onClick={() => { setSelectedUserId(user.id); setSelectedUserName(user.name);
          }}>
            <h3>{user.name}</h3>
            <p>{user.company.catchPhrase}</p>
          </li>
        ))}
      </ul>

      {posts.length > 0 && (
        <>
          <h2>Posts do Usuário {selectedUserName}</h2>
          <ul className='posts'>
            {posts.map(post => (
               <li key={post.id} onClick={() => setSelectedPostId(post.id)}
               onMouseEnter={() => setShowComment(true)}
               onMouseLeave={() => setShowComment(false)}>
                            
                <h3>{post.title} </h3>
                <p>{post.body}</p>

          {showComment && "Ver comentario"}

              </li>
            ))}
          
          </ul>
        </>
      )}

      {comments.length > 0 && (
        <>
          <h2>Comentários do post</h2>
          <ul className='comentario'>
            {comments.map(comment => (
             <li key={comment.id}  > 
             
               <h3>Name:</h3> <p>  {comment.name}</p>
                
               <h3>Email:</h3>   <p>    {comment.email}</p>

               <h3>Comentários: </h3>  {comment.body} </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default FetchData;
