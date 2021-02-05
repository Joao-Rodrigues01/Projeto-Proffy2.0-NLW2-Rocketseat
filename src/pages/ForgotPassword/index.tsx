import React from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';

import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';
import Input from '../../components/Inputs';


import './styles.css';

const ForgotPassword: React.FC = () => {
  return (
    <div id="forgot-password">
      <main>
         <Link to="/"> <img src={backIcon} alt="voltar"/> </Link>
          <Form onSubmit={() => {}}>
              <h1>Eita, esqueceu sua senha?</h1>
                <p>Não esquenta, vamos dar um jeito nisso.</p>

                  <Input
                    name="email"
                    placeholder="E-mail"
                    style={{borderRadius: '8px'}}
                  />

                <button type="submit">Enviar</button>
          </Form>

      </main>

        <div className="proffy-container">
            <div className="back-img">
              <img src={logoImg} alt="Proffy"/>
              <p>Sua plataforma de estudos online.</p>
            </div>
        </div>
    </div>
  );
};

export default ForgotPassword;
