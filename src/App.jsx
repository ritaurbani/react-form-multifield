import { useState } from 'react'



function App() {

  const initialFormData = {
    title: "",
    content: "",
    category: "",
    image: "https://picsum.photos/400/300",
    published: true
  }

  const [posts, setPosts] = useState([])

  const [formData, setFormData] = useState(initialFormData)// object

  // FUNZIONE UNICA PER GESTIRE EVENTO ONCHANGE-Recuperiamo nome e valore del campo-Aggiorniamo il nostro stato
  function handleEventOnChange(event) {
    setFormData((formData) => ({
      ...formData,
      [event.target.name]: event.target.value,
    })
    )
  }

  //Form function-Aggiornare lsita-Aggiungere oggetto alla lista
  const handlePostForm = (event) => {
    event.preventDefault();
    // intercetta bottone - console.log("submit") 
    // AGGIUNGIAMO NUOVO POST AL BLOG
    setPosts((posts) => [...posts, { id: Date.now(), ...formData }]);
    // RESETTO FORM E PORTO A STATO INIZIALE
    setFormData(initialFormData);
  };

  //                    // olga
  //   const handleEventOnChange = (event) => {
  //     const keyToChange = event.target.name;
  //     const newValue = event.target.value;
  //   const newData = {
  //     ...formData,
  //     [keyToChange]: newValue,
  //   };

  //   setFormData(newData);
  // };

  //   const handlePostForm = (event) => {
  //     event.preventDefault();

  //     // 1 creo l'oggetto della nuova pizza
  //     const newPost = {
  //       ...formData,
  //       id: Date.now(),
  //     };

  //     // 2 creo la copia dell'array menu precedente, aggiungendo la nuova pizza
  //     const newArray = [...posts, newPost];

  //     // 3. aggiorno lo stato del menu
  //     setPosts(newArray);

  //     // 4. Ripulisco i campi del form
  //     setFormData(initialFormData);
  //   };

  const removeElement = (elementToRemove) => {
    const newArray = posts.filter((curpost) => curpost.id !== elementToRemove);
    setPosts(newArray)
  }

  return (
    <>
      <div className='container'>
        <h2 className='text-center mb-4'>Il mio Blog</h2>

        {/* INPUT TITLE */}
        <section>
          <form onSubmit={handlePostForm} >
            <div className='mb-3'>
              <label htmlFor="titolo">Cerca titolo articolo</label>
              <input
                type="text"
                className='form-control'
                id='title'
                name='title'
                value={formData.title}
                onChange={handleEventOnChange} />
            </div>
            {/* INPUT CONTENT */}
            <div className='mb-3'>
              <label htmlFor="content">Inserisci una descrizione</label>
              <textarea
                type="text"
                className='form-control'
                id='content'
                name='content'
                value={formData.content}
                onChange={handleEventOnChange}></textarea>
            </div>
            {/* INPUT CATEGORY */}
            <div className='mb-3'>
              <label htmlFor="category">Category:</label>
              <select
                type="text"
                className='form-control'
                id='category'
                name='category'
                value={formData.category}
                onChange={handleEventOnChange}>
                  <option value="">Select a category</option>
                  <option value="technology">Fashion</option>
                  <option value="science">Science</option>
                  <option value="art">Art</option>
                  <option value="history">History</option>
              </select>
            </div>
            {/* INPUT IMAGE */}
            <div className='mb-3'>
              <label htmlFor="content">Image</label>
              <input
                type="image"
                className='form-control'
                id='image'
                name='image'
                value={formData.image}
                onChange={handleEventOnChange}></input>
            </div>
            
            <button type='submit' className='my-4 btn btn-success'>Submit</button>
          </form>
        </section>

        {/* card */}
        <div className='row row-cols-2 row-cols-lg-3'>
          {
            posts.map((post, index) => (
              post.published &&
              <div className='col' key={index}>
                <div className='card'>
                  <div className='card-body'>
                    <h4>{post.title}</h4>
                    <p>{post.content}</p>
                    <p>{post.category}</p>
                    <img src={post.image} alt="" 
                      className='w-75 p-3'/>
                      <div>
                    <button className='mx-2 btn btn-outline-success btn-sm'
                      onClick={() => { removeElement(post.id) }}>Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default App;