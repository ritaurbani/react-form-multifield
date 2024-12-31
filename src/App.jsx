import { useState } from 'react'

function App() {

  const initialFormData = {
    title: "",
    content: "",
    category: "",
    image: "",
    published: false,
    tags: [],
  }

  const [posts, setPosts] = useState([])

  const [formData, setFormData] = useState(initialFormData)// object  //form dat ae solo per lettura non per aggiornamento-aggiornamento e per nuovo oggetto

  //               FUNZIONE ONCHANGE aggiorna il valore passato-event(obj)
  const handleEventOnChange = (event) => { //event e`oggetto della callback nonche parametro
    const keyToChange = event.target.name;
    console.log('event: ', event.target)
    console.log(`the input ${keyToChange} is changing, the new value is ${event.target.type === "checkbox" ? event.target.checked : event.target.value}`) //se primo e`true stampa altrimenti stampa secondo
    // Se l'input è checkbox,
    //    allora il value da inserire sarà true o false, preso da target.checked
    let newValue;

    if (event.target.type === "checkbox") {
      newValue = event.target.checked;
    } else {
      newValue = event.target.value; //assegno valore a variabile newValue
    }

    console.log('formData: ', formData)//stato prima
    const newData = {
      ...formData,
      [keyToChange]: newValue, //override property title con quello che scrivo
    };
    console.log('new formData: ', newData)

    setFormData(newData); //rerender dell input finale
  };

  // const handleEventOnChange2 = (event) => {
  //   const keyToChange = event.target.name;
  //   console.log(`the input ${keyToChange} is changing, the new value is ${event.target.type === "checkbox" ? event.target.checked : event.target.value}`) //se primo e`true stampa altrimenti stampa secondo
  //   // Se l'input è checkbox,
  //   //    allora il value da inserire sarà true o false, preso da target.checked
  //   let newValue;

  //   if (event.target.type === "checkbox") {
  //     newValue = event.target.checked;
  //   } else {
  //     newValue = event.target.value; //assegno valore a variabile newValue
  //   }


  //   const newData = {
  //     ...formData,
  //     [event.target.name] : event.target.value
  //     // [keyToChange]: newValue,
  //   };

  //   setFormData(newData);
  // };

  //               FUNZIONE FORM SUBMIT
  const handlePostForm = (event) => {
    event.preventDefault();

    // 1 creo l'oggetto del nuovo post
    const newPost = {
      ...formData,
      id: Date.now(),
    };

    console.log('newPost: ', newPost)

    // 2 creo la copia dell'array posts precedente, aggiungendo il nuovo post
    const newArray = [...posts, newPost];

    // 3. aggiorno lo stato dei posts
    setPosts(newArray);

    // 4. Ripulisco i campi del form
    setFormData(initialFormData);
  };

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
          {/* //FORM */}
          <form onSubmit={handlePostForm} >

            <div className='mb-3'>
              <label htmlFor="title">Cerca titolo articolo</label>
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
                type="file"
                className='form-control'
                id='image'
                name='image'
                value={formData.image}
                onChange={handleEventOnChange} />
            </div>

            {/* INPUT PUBLISHED */}
            <div className='mb-3'>
              <label htmlFor="published">Published</label>
              <input
                type="checkbox"
                id='published'
                name='published'
                checked={formData.published}
                onChange={handleEventOnChange} />
            </div>

            {/* INPUT TAGS */}
            {/* <div className='mb-3'>
              <label htmlFor="published">Published</label>
              <input
                type="checkbox"
                id='published'
                name='published'
                checked={formData.published}
                onChange={handleEventOnChange}/>
            </div> */}

            {/* //BUTTON */}
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
                      className='w-75 p-3' />
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