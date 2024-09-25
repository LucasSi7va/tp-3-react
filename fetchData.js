import React, { useState, useEffect } from 'react';
import "./fetchData.css";


const FetchData = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState('');
  const [isGradeView, setIslistView] = useState(true);
 
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

  const toggleView = () => {
    setIslistView(!isGradeView);
  };
  
  
  const handleBackToUsers = () => {
    setSelectedUserId(null);
    setSelectedPostId(null);
    setComments([]);
    setPosts([]);
  };

 
 
  const handleBackToPosts = () => {
    setSelectedPostId(null);
    setComments([]);
  };


  const handleDeleteComment = (commentId) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };


  return (
    <div>

        <button onClick={toggleView}>
          Alternar para {isGradeView ? "Lista" : "Grade"}
        </button>


      <h2>Usuários</h2>
      <ul className={`grade ${isGradeView ? 'gradView' : 'listView'}`}>
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
          <ul className={`posts ${isGradeView ? 'gradView' : 'listView'}`}>
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
          <ul className={`comentario ${isGradeView ? 'gradView' : 'listView'}`}>
            {comments.map(comment => (
             
             <li key={comment.id}  > 
             
             <span className="delete-comment" onClick={() => handleDeleteComment(comment.id)}>
               <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#e8eaed"><path d="M261-120q-24.75 0-42.37-17.63Q201-155.25 201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"/></svg>
               </span>

               <h3>Name:</h3> <p>  {comment.name}</p>
                

               <h3>Email:</h3>   <p>    {comment.email}</p>
              
               <h3>Comentários: </h3>  {comment.body} 
               
               </li> 
              
              
            ))}
          </ul>
        </>
      )}

        <nav>

        {selectedPostId && (
          <button onClick={handleBackToPosts}>Voltar para os Posts</button>
        )}
        {selectedUserId && !selectedPostId && (
          <button onClick={handleBackToUsers}>Voltar para Usuários</button>
        )}
         </nav>



    </div>
  );
};

export default FetchData;
