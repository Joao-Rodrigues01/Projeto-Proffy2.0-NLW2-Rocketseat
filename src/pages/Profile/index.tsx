import React, { useState, FormEvent, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { FiCamera } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useAuth } from '../../hooks/AuthContext';

import PageHeader from '../../components/PageHeader';
import InputLabel from '../../components/InputLabel';

import warningIcon from '../../assets/images/icons/warning.svg';
import Select from '../../components/Select';
import Textarea from '../../components/Textarea';
import api from '../../services/api';

import './styles.css';

const Profile: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();
  const formRef = useRef<FormHandles>(null);

  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

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

 const handleCreateClass = useCallback(async (data: FormEvent) =>{

   await api
      .post(`/classes/${user.id}`, {
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems,
      })
      .then(() => {
        alert('Cadastro realizado com suceso!');
        history.push('/dashboard');
      })
      .catch((err) => {
        alert('Erro no cadasto!');
        console.log(err);
      });

  }, [whatsapp, bio, subject, cost, scheduleItems, history, user.id]);


  return (
    <div id="page-profile" className="container">
      <PageHeader headerTitle="Meu perfil">
          <header>
            <div className="profile-img">
                <img src="https://avatars.githubusercontent.com/u/61169118?s=460&u=8433bc8b05b820853155e079fdcdaae69000a878&v=4"
                    alt="João"
                />
                  <div className="cam-icon">
                    <FiCamera size={24} color="#fff" />
                  </div>
                <h1>João Rodrigues</h1>
                <p>Matemática</p>
              </div>
          </header>
      </PageHeader>

      <main>
        <Form  ref={formRef} onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <div className="user-info">

               <InputLabel title="Nome" name="name">
                  <input
                    style={{width: '288px'}}
                    name="name"
                    placeholder="Jonas"
                    value={whatsapp}
                    onChange={(e) => {
                    setWhatsapp(e.target.value);
                    }}
                    />
                </InputLabel>


                <InputLabel title="Sobrenome" name="surname">
                  <input
                    style={{width: '288px'}}
                    name="surname"
                    placeholder="Rodrigues"
                    value={whatsapp}
                    onChange={(e) => {
                    setWhatsapp(e.target.value);
                    }}
                    />
                </InputLabel>

            </div>

            <div className="user-info">
                  <InputLabel title="E-mail" name="email">
                    <input
                      style={{width: '364px'}}
                      name="email"
                      placeholder="jonas.victir@gmail.com"
                      value={whatsapp}
                      onChange={(e) => {
                      setWhatsapp(e.target.value);
                      }}
                      />
                  </InputLabel>


                  <InputLabel title="Whatsapp" name="whatsapp">
                    <input
                      style={{width: '186px'}}
                      name="whatsapp"
                      placeholder="(   ) _ ____ ____"
                      value={whatsapp}
                      onChange={(e) => {
                      setWhatsapp(e.target.value);
                      }}
                    />
                  </InputLabel>
            </div>
            <Textarea
              name="bio"
              label="Biografia (Máximo 300 caracteres)"
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
              }}
            />
          </fieldset>

          <fieldset id="class-field">
            <legend>Sobre a aula</legend>

            <Select
              title="Selecione qual você quer ensinar"
              style={{width: '383px'}}
              name="subject"
              label="Matéria"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
              }}
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
                  <input
                    style={{width: '192px'}}
                    name="cost"
                    placeholder="R$"
                    value={cost}
                    onChange={(e) => {
                      setCost(e.target.value);
                    }}
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
                        onChange={(e) =>
                          setScheduleItemValue(index, 'week_day', e.target.value)
                        }
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
                        <input
                          style={{width: '128px'}}
                          name="from"
                          type="time"
                          value={scheduleItem.from}
                          onChange={(e) =>
                            setScheduleItemValue(index, 'from', e.target.value)
                          }
                          />
                      </InputLabel>

                      <InputLabel title="Até" name="to" style={{marginLeft: '0'}}>
                        <input
                          style={{width: '128px'}}
                          name="to"
                          type="time"
                          value={scheduleItem.to}
                          onChange={(e) =>
                            setScheduleItemValue(index, 'to', e.target.value)
                          }
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
