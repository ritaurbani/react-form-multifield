import { useState } from 'react'

function App() {

  //default state when the form is initially loaded.
  const initialFormData = {
    title: "",
    content: "",
    category: "",
    image: "",
    published: false,
    tags: [
      { name: "art", value: false },
      { name: "tech", value: false },
    ]
  }


  // const tags = formData.tags

  const [posts, setPosts] = useState([])

  const [formData, setFormData] = useState(initialFormData)// object  //form dat ae solo per lettura non per aggiornamento-aggiornamento e per nuovo oggetto



  //               FUNZIONE ONCHANGE aggiorna il valore passato-event(obj)
  const handleEventOnChange = (event) => { //event e`oggetto della callback nonche parametro
    // const { name, type, value, checked} = event.target


    const keyToChange = event.target.name; //questa line non mi serve con destrutturazione 
    console.log('event: ', event.target)
    console.log(`the input ${keyToChange} is changing, the new value is ${event.target.type === "checkbox" ? event.target.checked : event.target.value}`) //se primo e`true stampa altrimenti stampa secondo
    // Se l'input è checkbox,
    //    allora il value da inserire sarà true o false, preso da target.checked

    let newValue;

    // Devo controllare se il tipo dell'input è text o checkbox 
    //Con destrutturazione:  const { name, type, value, checked} = event.target
    // if (type === "checkbox") {
    //   valoreInput = checked;
    // } else valoreInput = value;

    if (event.target.type === "checkbox") { //if (type ==="checkbox" ) 
      newValue = event.target.checked;
    } else {
      newValue = event.target.value; //assegno valore a variabile newValue
    }

    console.log('formData: ', formData)//stato prima
    //creates a new object 
    const newData = {
      ...formData,
      //updates the specific field(keyToChange) with the new value(newValue).
      [keyToChange]: newValue, //override property title con quello che scrivo
    };
    console.log('new formData: ', newData)
    //Updates the state with the new form data, causing the component to re-render.
    setFormData(newData); //rerender dell input finale
  };

  const handleTagsOnChange = (event) => {
    const keyToChange = event.target.name;
    let newValue = event.target.checked;
    const newTags = formData.tags.map((tag) => {
      if (keyToChange === tag.name) {
        return ({
          ...tag,
          value: newValue
        })
      }

      return tag
    })

    const newData = {
      ...formData,
      tags: newTags

    }
    setFormData(newData)
  }
  ///////////////////  TAG ////////////////////////
  // const callbackSyncTags = (event) => {
  //   // Prendo name e valore dell'input di tipo checkbox
  //   const { name, checked } = event.target;

  //   const newArray = checked
  //     ? [...oggettoInpState.tags, name]
  //     : oggettoInpState.tags.filter((currElement) => currElement !== name);

  //   oggettoSetInpState({
  //     ...oggettoInpState,
  //     tags: newArray,
  //   });
  // };
//ESEMPIO TAG FIELD
  // {/* Input per i checkbox tags */ }
  // <div>
  //   <h3>Scegli tags del libro</h3>
  //   {/* Checkbox fantasy */}
  //   <label htmlFor="fantasy">
  //     Fantasy
  //     <input
  //       id="fantasy"
  //       type="checkbox"
  //       name="fantasy"
  //       onChange={callbackSyncTags}
  //     />
  //   </label>
  //   {/* Checkbox comedy */}
  //   <label htmlFor="comedy">
  //     Comedy
  //     <input
  //       id="comedy"
  //       type="checkbox"
  //       name="comedy"
  //       onChange={callbackSyncTags}
  //     />


  //               FUNZIONE FORM SUBMIT
  const handlePostForm = (event) => {
    event.preventDefault();

    // 1 creo l'oggetto del nuovo post by coping..
    const newPost = {
      ...formData,
      //adding a unique id
      id: Date.now(),
    };

    console.log('newPost: ', newPost)

    // 2 creo la copia dell'array posts precedente, aggiungendo il nuovo post
    const newArray = [...posts, newPost];

    // 3. aggiorno lo stato dei posts
    setPosts(newArray);

    // 4. Ripulisco i campi del form reser back to initial values after the post has been added.
    setFormData(initialFormData);
  };
  //filtering out the post with the id that matches the elementToRemove (passed as a parameter).
  //voglio fare un filter rimuovendo id indexToDelete da arrayState
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

            {formData.tags.map((tag, index) => {
              return <div key={index} className='mb-3'>
                <label htmlFor={tag.name}>{tag.name}</label>
                <input
                  type="checkbox"
                  id={tag.name}
                  name={tag.name}
                  checked={tag.value}
                  onChange={handleTagsOnChange} />
              </div>
            })}


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
                    <p>{post.tags.map((tag) => {
                      console.log(tag)
                      return tag.value && tag.name + ' '

                    })}</p>
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