import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';

import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import PurpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
import api from '../../services/api';

import './styles.css';
import { useAuth } from '../../hooks/AuthContext';

const Dashboard: React.FC = () => {
  const [totalConnections, setTotalConnections] = useState(0);
  const { signOut } = useAuth();

  useEffect(() => {
    api.get('connections').then((response: any) => {
      const { total } = response.data;
      setTotalConnections(total);
    });
  }, []);

  return (
    <div id="dashboard-page">
      <div id="page-landing">
            <header>
                <div className="profile-info">
                  <img
                    src="https://static-cdn.jtvnw.net/jtv_user_pictures/07499b3d-5e5e-4366-b6b9-3ea09fc19ecd-profile_image-70x70.png"
                     alt="Yoda"
                  />
                  Thiago Luchenberg
                </div>

                <button type="button" onClick={signOut}>
                  <FiPower color="#D4C2FF" size={24}/>
                </button>
              </header>

              <div id="page-landing-content" className="container">

                <div className="logo-container">
                  <img src={logoImg} alt="LogoProffy" />
                  <h2>Sua plataforma de estudos online.</h2>
                </div>

                <img
                  src={landingImg}
                  alt="Plataforma de estudos"
                  className="hero-image"
                />
              </div>
      </div>

          <main>
              <div>
                <p>Seja bem-vindo.</p>
                <strong>O que deseja fazer?</strong>
              </div>

              <span className="total-connections">
                Total de
                {` ${totalConnections} `}
                conexões já realizadas
                <img src={PurpleHeartIcon} alt="Coração roxo" />
              </span>

            <div className="buttons-container">
              <Link to="/study" className="study">
                <img src={studyIcon} alt="Estudar" />
                Estudar
              </Link>

              <Link to="/give-classes" className="give-classes">
                <img src={giveClassesIcon} alt="Dar aulas" />
                Dar aulas
              </Link>
            </div>
         </main>
    </div>
  );
};

export default Dashboard;
