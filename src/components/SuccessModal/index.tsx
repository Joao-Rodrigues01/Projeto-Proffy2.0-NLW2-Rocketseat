import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './styles.css';

interface ModalProps {
  title: string;
  description: string;
  success: boolean;
  link: string;
  linkTitle: string;
}

export const SuccessModal: React.FC<ModalProps> =
  ({ title, description, success, link, linkTitle }) => {
  return (
    <div id="success-page" style={{right: success ? '0' : '-100'}}>
    <main>
      <FiCheckCircle size={80} color="#04D361" />

      <h1>{title}</h1>
      <p>{description}</p>

      <Link to={link}>{linkTitle}</Link>
    </main>
  </div>
  )
};
