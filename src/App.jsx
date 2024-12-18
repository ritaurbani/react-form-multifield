import { useState } from 'react'
import blog from "./data/posts"


function App() {

  const [posts, setPosts] = useState([])

  //variabile input
  const [postTitle, setPostTitle] = useState("")

  //Form function
  const handlePostForm = (event) => {
    event.preventDefault();
    // intercetta bottone - console.log("submit") 
    // COSE DA FARE????
    //CREO NUOVO POST
    const newPost = {
      id: Date.now(),
      title: postTitle,
    };

    console.log(newPost)
    //CREO COPIA ARRAY AGGIUNGENDO NUOVO POST
    const newArray = [...posts, newPost]

    //AGGIORNO STATO DEL POST
    setPosts(newArray)
    //RESET CAMPO INPUT PER IL TITOLO
    setPostTitle("")
  };

  const removeElement = (elementToRemove) => {
    const newArray = posts.filter((curpost) => curpost !== elementToRemove);
    setPosts(newArray)
  }



  return (
    <>
      <div className='container'>
        <h2 className='text-center mb-4'>Il mio Blog</h2>

        {/* INPUT nuovo post */}
        <section>

          <form onSubmit={handlePostForm} >
            <div className='mb-3'>
              <label htmlFor="titolo">Cerca titolo articolo</label>
              <input type="text"
                className='form-control'
                id='titolo'
                value={postTitle}
                onChange={(event) => setPostTitle(event.target.value)} />
            </div>
            <button type='submit' className='my-4 btn btn-success'>Submit</button>
          </form>
        </section>

        {/* LIST */}
        <ul className='list-group list-group-flush'>
          {
            posts.map((post, index) => (
              <li className='list-group-item' key={index}>{post.title}
                <span></span>
                {/* chiamiamo la funzione passando l elemento cliccato */}
                <button className='mx-2 btn btn-outline-success btn-sm' onClick={() => { removeElement(post) }}>Cancel</button>
              </li>
            ))
          }
        </ul>


      </div>
    </>
  )
}