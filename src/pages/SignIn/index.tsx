import React, { useRef, useCallback, useState } from 'react';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link } from 'react-router-dom';

import * as Yup from 'yup';
import logoImg from '../../assets/images/logo.svg';
import getValidationErrors from '../../utils/getValidationErrors';

import PurpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import Input from '../../components/Inputs';
import './styles.css';


interface SignUpData {
  name: string;
  surname: string;
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const [isPassword, setIsPassword] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: SignUpData) => {
    try {
          formRef.current?.setErrors({});
          const schema = Yup.object().shape({
            email: Yup.string().required('E-mail obrigatório!').email('Digite um e-mail válido'),
            password: Yup.string().required('Senha obrigatória!'),
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          console.log(data);

        } catch (err) {
          if (err instanceof Yup.ValidationError) {
            const errors = getValidationErrors(err);

            formRef.current?.setErrors(errors);

            console.log(err);
            return;
          }
        }
  }, []);

  const handlePassword = useCallback(() => {
    setIsPassword(!isPassword);
  }, [isPassword]);

  return (
    <div id="login-page">
      <div className="proffy-container">
          <div className="back-img">
            <img src={logoImg} alt="Proffy"/>
            <p>Sua plataforma de estudos online.</p>
          </div>
      </div>

      <main>
          <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Fazer login</h1>

                <Input
                  name="email"
                  placeholder="E-mail"
                  style={{borderRadius: '8px 8px 0px 0px'}}
                />

                <Input
                  name="password"
                  type={isPassword ? "text" : "password"}
                  placeholder="Senha"
                  style={{borderRadius: '0px 0px 8px 8px'}}
                  icon={isPassword ?  RiEyeLine : RiEyeOffLine}
                  click={handlePassword}
                />


                <div className="check-container">
                  <input
                    type="checkbox"
                    name="check"
                    id="check"
                    className="checkmark"
                    hidden
                  />

                  <label htmlFor="check"  id="checkmark"></label>
                  <label className="label-remember">Lembrar-me</label>
                  <Link to="/forgot-password" className="forgot-password"> Esqueci minha senha</Link>
                </div>

                <button type="submit">Entrar</button>
          </Form>

          <div className="footer">
            <p>Não tem conta?
              <Link to="/signup">Cadastre-se</Link>
            </p>

            <span>É de graça <img src={PurpleHeartIcon} alt="Coração roxo "/></span>
          </div>
      </main>
    </div>
  );
};

export default SignIn;
