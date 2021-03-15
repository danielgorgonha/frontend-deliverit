import React from 'react';
import { Container } from '../Container';

import './styles.scss';

interface Props {
  onClose: () => void;
  id?: string;
  title: string;
}

const Modal: React.FC<Props> = ({ id = "modal_form", title, onClose, children }) => {
  const handleOutsideClose = (event: any) => {
    if (event.target.id === id) onClose();
  }
  return (
    <div className="container" id={id} onClick={handleOutsideClose}>
    <div className="container">
      <button className="close" type="button" onClick={onClose} />
      <h3 className="title">{title}</h3>
      <div className="content">{children}</div>
    </div>
    </div>
  );
}

export { Modal };