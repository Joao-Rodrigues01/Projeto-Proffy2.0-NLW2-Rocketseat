import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';

import PageHeader from '../../components/PageHeader';
import InputLabel from '../../components/InputLabel';

import warningIcon from '../../assets/images/icons/warning.svg';
import rocketIcon from '../../assets/images/icons/rocket.svg';
import Select from '../../components/Select';
import Textarea from '../../components/Textarea';
import api from '../../services/api';

import './styles.css';

const TeacherForm: React.FC = () => {
  const history = useHistory();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
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

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();

    api
      .post('classes', {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems,
      })
      .then(() => {
        alert('Cadastro realizado com suceso!');
        history.push('/');
      })
      .catch(() => {
        alert('Erro no cadasto!');
      });
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição."
        headerTitle="Dar aulas"
        imgIcon={rocketIcon}
        imgIconDesc="Prepare-se! vai ser o máximo."
      />

      <main>
        <Form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <div className="user-info">
              <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/07499b3d-5e5e-4366-b6b9-3ea09fc19ecd-profile_image-70x70.png"
                  alt="Yoda"
                />
              <p>Tiago Luchenberg</p>


                <InputLabel title="Whatsapp" name="whatsapp">
                  <input
                    style={{width: '224px'}}
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

export default TeacherForm;
