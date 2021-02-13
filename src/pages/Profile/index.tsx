import React, { useState, FormEvent, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { FiCamera } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useAuth } from '../../hooks/AuthContext';

import PageHeader from '../../components/PageHeader';
import InputLabel from '../../components/InputLabel';

import InputProfile from '../../components/InputProfile';
import warningIcon from '../../assets/images/icons/warning.svg';
import Select from '../../components/Select';
import Textarea from '../../components/Textarea';
import api from '../../services/api';

import './styles.css';

interface ProfileData {
  name: string;
  surname: string;
  whatsapp: string;
  email: string;
  bio: string;
  subject: string;
  cost: number;
    schedule: Array<{
    week_day: number;
    from: string;
    to: string;
    }>
}

const Profile: React.FC = () => {
  const history = useHistory();
  const { user, updateUser } = useAuth();
  const formRef = useRef<FormHandles>(null);



  const { name, surname, email, whatsapp, bio, subject , cost, schedule} = user;
// Fazer schedule com array e validar no login se ele possui class ou nao

  const userData = {
    name,
    surname,
    email,
    whatsapp,
    bio,
    subject,
    cost,
    schedule
  }

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' },
  ]);


  function addNewScheduleItem() {
    setScheduleItems([...scheduleItems, { week_day: 0, from: '', to: '' }]);
  }

  function setScheduleItemValue(
    position: number,
    field: string,
    value: string,
  ) {
    const updateScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }
      return scheduleItem;
    });

    setScheduleItems(updateScheduleItems);
  }

 const handleUpdateProfile = useCallback(async (data: ProfileData) =>{
  try {

    const response  = await api.put(`/profile/${user.id}`, data);

    updateUser(response.data);
  } catch (err) {
    console.log(err);
  }

  }, [updateUser]);


  return (
    <div id="page-profile" className="container">
      <PageHeader headerTitle="Meu perfil">
          <header>
            <div className="profile-img">
                <img src={user.avatar}
                    alt={user.name}
                />
                  <div className="cam-icon">
                    <FiCamera size={24} color="#fff" />
                  </div>
                <h1>{`${user.name} ${user.surname}`}</h1>
                <p>Matemática</p>
              </div>
          </header>
      </PageHeader>

      <main>
        <Form  initialData={userData} ref={formRef} onSubmit={handleUpdateProfile}>
          <fieldset>
            <legend>Seus dados</legend>

            <div className="user-info">

               <InputLabel title="Nome" name="name">
                  <InputProfile
                    style={{width: '288px'}}
                    name="name"

                    />
                </InputLabel>


                <InputLabel title="Sobrenome" name="surname">
                  <InputProfile
                    style={{width: '288px'}}
                    name="surname"

                    />
                </InputLabel>

            </div>

            <div className="user-info">
                  <InputLabel title="E-mail" name="email">
                    <InputProfile
                      style={{width: '364px'}}
                      name="email"
                      />
                  </InputLabel>

                  <InputLabel title="Whatsapp" name="whatsapp">
                    <InputProfile
                      style={{width: '186px'}}
                      name="whatsapp"
                    />
                  </InputLabel>
            </div>
            <Textarea
              name="bio"
              label="Biografia (Máximo 300 caracteres)"
            />
          </fieldset>

          <fieldset id="class-field">
            <legend>Sobre a aula</legend>

            <Select
              title="Selecione qual você quer ensinar"
              style={{width: '383px'}}
              name="subject"
              label="Matéria"
              options={[
                { value: 'Artes', label: 'Artes' },
                { value: 'Biologia', label: 'Biologia' },
                { value: 'Ciências', label: 'Ciências' },
                { value: 'Educação Física', label: 'Educação Física' },
                { value: 'Português', label: 'Português' },
                { value: 'Matemática', label: 'Matemática' },
                { value: 'História', label: 'História' },
                { value: 'Química', label: 'Química' },
                { value: 'Geografia', label: 'Geografia' },
                { value: 'Física', label: 'Física' },
                { value: 'Inglês', label: 'Inglês' },
              ]}
            />
              <InputLabel title="Custo da sua hora / aula" name="cost">
                  <InputProfile
                    style={{width: '192px'}}
                    name="cost"
                    placeholder="R$"
                    />
              </InputLabel>
          </fieldset>

          <fieldset >
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.week_day} className="schedule-item">
                    <div className="horarios">
                      <Select
                        style={{width: '320px'}}
                        name="week_day"
                        label="Dia da semana"
                        value={scheduleItem.week_day}
                        options={[
                          { value: '0', label: 'Domingo' },
                          { value: '1', label: 'Segunda-feira' },
                          { value: '2', label: 'Terça-feira' },
                          { value: '3', label: 'Quarta-feira' },
                          { value: '4', label: 'Quinta-feira' },
                          { value: '5', label: 'Sexta-feira' },
                          { value: '6', label: 'Sábado' },
                        ]}
                      />

                      <InputLabel title="Das" name="from" style={{marginLeft: '0'}}>
                        <InputProfile
                          style={{width: '128px'}}
                          name="from"
                          type="time"
                          // value={scheduleItem.from}

                          />
                      </InputLabel>

                      <InputLabel title="Até" name="to" style={{marginLeft: '0'}}>
                        <InputProfile
                          style={{width: '128px'}}
                          name="to"
                          type="time"
                          // value={scheduleItem.to}
                          />
                      </InputLabel>
                    </div>
                    <div className="btn-delete">
                      <button type="button">Excluir horário</button>
                    </div>
              </div>
              );
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
                Importante!
              <br />
              Preencha todos os dados corretamente
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </Form>
      </main>
    </div>
  );
};

export default Profile;
