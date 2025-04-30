import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import NewTodo from './NewTodo';

function Header() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="Header">
      <h1>QuickTick</h1>
      <button onClick={openModal}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
      {showModal && <NewTodo closeModal={closeModal} />}
    </div>
  );
}

export default Header;