import React, { useCallback, useRef, useState } from 'react';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { SuccessModal } from '../../components/SuccessModal';

import * as Yup from 'yup';
import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';
import getValidationErrors from '../../utils/getValidationErrors';

import './styles.css';
import api from '../../services/api';
import Input from '../../components/Inputs';

interface SignUpData {
  name: string;
  surname: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {

  const [isPassword, setIsPassword] = useState(false);
  const [IsSuccess, SetisSuccess] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: SignUpData) => {
    try {
          formRef.current?.setErrors({});
          const schema = Yup.object().shape({
            name: Yup.string().required('Nome obrigatório!'),
            surname: Yup.string().required('Sobrenome obrigatório!'),
            email: Yup.string().required('E-mail obrigatório!').email('Digite um e-mail válido'),
            password: Yup.string().required('Senha obrigatória!'),
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          console.log(data);
          await api.post('/users', data);


          SetisSuccess(!IsSuccess);

        } catch (err) {
          if (err instanceof Yup.ValidationError) {
            const errors = getValidationErrors(err);

            formRef.current?.setErrors(errors);

            console.log(err);
            return;
          }
        }
  }, [IsSuccess]);


  const handlePassword = useCallback(() => {
    setIsPassword(!isPassword);
  }, [isPassword]);

  return (
    <>
      <div id="signup-page" >
        <main >
          <Link to="/"> <img src={backIcon} alt="voltar"/> </Link>

            <Form ref={formRef} onSubmit={handleSubmit} >
                <h1>Cadastro</h1>
                  <p>Preencha os dados abaixo para começar.</p>



                  <Input
                    name="name"
                    type="text"
                    placeholder="Nome"
                    style={{borderRadius: '8px 8px 0px 0px'}}
                  />


                  <Input
                    name="surname"
                    type="text"
                    placeholder="Sobrenome"
                  />


                  <Input
                    name="email"
                    type="email"
                    placeholder="E-mail"
                  />

                  <Input
                    name="password"
                    type={isPassword ? "text" : "password"}
                    placeholder="Senha"
                    style={{borderRadius: '0px 0px 8px 8px'}}
                    icon={isPassword ?  RiEyeLine : RiEyeOffLine}
                    click={handlePassword}
                  />

                  <button type="submit">Concluir Cadastro</button>
            </Form>

        </main>

          <div className="proffy-container">
              <div className="back-img">
                <img src={logoImg} alt="Proffy"/>
                <p>Sua plataforma de estudos online.</p>
              </div>
          </div>
      </div>
           <SuccessModal
            title = "Cadastro concluído"
            description =
            "Agora você faz parte da plataforma da Proffy.Tenha uma ótima experiência."
            success={IsSuccess}
            link="/"
            linkTitle="Fazer login"
          />
    </>
  );
};

export default SignUp;
