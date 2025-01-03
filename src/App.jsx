import { useState } from 'react'
import Card from "./components/Card"

function App() {

  //default state when the form is initially loaded.
  const initialFormData = {
    title: "",
    content: "",
    category: "",
    image: "",
    published: false,
    tags: []
    // { name: "art", value: false },
    // { name: "tech", value: false },
  }

  // const tags = formData.tags

  const [posts, setPosts] = useState([])

  const [formData, setFormData] = useState(initialFormData)// object  

  //FUNZIONE ONCHANGE aggiorna il valore dell'input passato-event(obj)
  const handleEventOnChange = (event) => { //event e`oggetto della callback nonche parametro
    // const { name, type, value, checked} = event.target

    const keyToChange = event.target.name; //proprieta`nome - chiave dinamica
    console.log('event: ', event.target)
    console.log(`the input ${keyToChange} is changing, the new value is ${event.target.type === "checkbox" ? event.target.checked : event.target.value}`)//Se l'input è checkbox, il value da inserire sarà true o false.

    let newValue; //event.target.value oppure event.target.checked (aggiorna il valore dell'input)

    // Devo controllare se il tipo dell'input è text o checkbox 
    //Con destrutturazione:  const { name, type, value, checked} = event.target
    //let valoreInput;
    // if (type === "checkbox") {
    //   valoreInput = checked;
    // } else valoreInput = value;

    //Se l'input (event.target..) è di tipo checkbox, aggiorna il valore dell'input in base alla proprietà checked (vero o falso). Se l'input non è una checkbox, usa semplicemente il valore inserito (es. per un input di tipo text).
    if (event.target.type === "checkbox") { //if (type ==="checkbox" ) 
      newValue = event.target.checked;//true/false
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
    //Updates the state with the new form data/oggetto, causing the component to re-render.
    setFormData(newData); //rerender dell input finale
  };

  // const handleTagsOnChange = (event) => {
  //   ////////////////////////////////////
  //   const keyToChange = event.target.name;
  //   let newValue = event.target.checked;
  //   ////////////////////////////////////
  //   const newTags = formData.tags.map((tag) => {
  //     if (keyToChange === tag.name) {
  //       return ({
  //         ...tag,
  //         value: newValue
  //       })
  //     }
  //     return tag
  //   })
  //   const newData = {
  //     ...formData,
  //     tags: newTags
  //   }
  //   setFormData(newData)
  // }
  ///////////////////  TAG ////////////////////////
  const callbackSyncTags = (event) => {
  // const keyToChange = event.target.name;
  // let newValue = event.target.checked;

    // Prendo name e valore dell'input di tipo checkbox
    const { name, checked } = event.target;

    const newArray = checked  //creo nuovo array con elemento aggiunto o rimosso
      ? [...formData.tags, name]  // Se la checkbox è selezionata, aggiungi il tag all`array
      : formData.tags.filter((currElement) => currElement !== name); // Altrimenti, rimuovilo

    setFormData({
      ...formData,// Copia l'oggetto stato precedente
      tags: newArray, //aggiorna proprieta'tags con nuovo array
    });
  };
  
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
            {/* {formData.tags.map((tag, index) => {
              return <div key={index} className='mb-3'>
                <label htmlFor={tag.name}>{tag.name}</label>
                <input
                  type="checkbox"
                  id={tag.name}
                  name={tag.name}
                  checked={tag.value}
                  onChange={handleTagsOnChange} />
              </div>
            })} */}

            {/* Input per i checkbox tags */}
            <div>
              <h3>Scegli tags del libro</h3>
              {/* Checkbox fantasy */}
              <label htmlFor="fantasy">
                Fantasy
                <input
                  id="fantasy"
                  type="checkbox"
                  name="fantasy"
                  onChange={callbackSyncTags}
                />
              </label>
              {/* Checkbox comedy */}
              <label htmlFor="comedy">
                Comedy
                <input
                  id="comedy"
                  type="checkbox"
                  name="comedy"
                  onChange={callbackSyncTags}
                />
              </label>
              {/* Checkbox romance */}
              <label htmlFor="romance">
                Romance
                <input
                  id="romance"
                  type="checkbox"
                  name="romance"
                  onChange={callbackSyncTags}
                />
              </label>
            </div>

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
                <Card
                  title={post.title}
                  content={post.content}
                  category={post.category}
                  image={post.image}
                  tagsArraySpan={[]}
                  id={post.id}
                  onDelete={(event) => removeElement(post.id)}
                />
                {/* <div className='card'>
                  <div className='card-body'>
                    <h4>{post.title}</h4>
                    <p>{post.content}</p>
                    <p>{post.category}</p>
                    <img src={post.image} alt=""
                      className='w-75 p-3' />
                    
                      <div> */}
                        {/* //map restituira un elenco di span contenenti i tag di ciascun post */}
                        {/* {post.tags.map((currTag, currIndex) => {
                          console.log(currTag);
                        return <span className= "me-1" key={currIndex}>{currTag}</span>})}
                      </div>

                    <div>
                      <button className='mx-2 btn btn-outline-success btn-sm'
                        onClick={() => { removeElement(post.id) }}>Cancel</button>
                    </div>
                  </div>
                </div> */}
                
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default App;