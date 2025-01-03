
function Card({ title, content, category, image, tagsArraySpan, id, onDelete }) {

const tagsArraySpan = tagsArray.map((tag, index) => <span key={index}> {tag}</span>)

    return (
        <div className='card'>
            <div className='card-body'>
                <h4>{title}</h4>
                <p>{content}</p>
                <p>{category}</p>
                <img src={image} alt=""
                    className='w-75 p-3' />
                <p>{tagsArraySpan}</p>
                <div>
                    <button className='mx-2 btn btn-outline-success btn-sm'
                        onClick={onDelete}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default Card