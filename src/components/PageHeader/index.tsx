import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

import './styles.css';

interface PageHeaderProps {
  title?: string;
  description?: string;
  headerTitle: string;
  imgIcon?: string;
  imgIconDesc?: string;
  style?: object;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  headerTitle,
  children,
  imgIcon,
  imgIconDesc,
  style,
}) => {
  return (
    <header className="page-header">
      <div className="top-bar-container">
        <Link to="/dashboard">
          <img src={backIcon} alt="Voltar" />
        </Link>
          <span>{headerTitle}</span>
        <img src={logoImg} alt="Proffy" />
      </div>

      <div className="header-content">
        <div className="title-content">
          <strong>{title}</strong>
          {description && <p>{description}</p>}
          {children}
        </div>

      { imgIcon && <div className="icon-content" style={style}>
          <img src={imgIcon} alt="Icone"/>
          <p>{imgIconDesc}</p>
        </div>}
      </div>
    </header>
  );
};

export default PageHeader;
