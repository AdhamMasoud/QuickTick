import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
function Card() {
    return (
      <div className="Card">
        <h2>Title</h2>
        <div>
        <button >
           <FontAwesomeIcon icon={faEdit} />
        </button>
        <button >
           <FontAwesomeIcon icon={faTrash} />
        </button>
        </div>
        <p>Decripthion</p>
      </div>
    );
  }
  
  export default Card;
  