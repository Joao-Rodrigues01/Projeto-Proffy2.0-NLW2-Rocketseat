import React, { useState, FormEvent, useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import PageHeader from '../../components/PageHeader';

import Input from '../../components/Inputs';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import smileIcon from '../../assets/images/icons/smile.svg';
import Select from '../../components/Select';
import api from '../../services/api';

import './styles.css';
import InputLabel from '../../components/InputLabel';

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState([]);
  const formRef = useRef<FormHandles>(null);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

const searchTeachers = useCallback(async (data: FormEvent) => {

  const response = await api.get('classes', {
    params: {
      subject,
      week_day,
      time,
    },
  });

  setTeachers(response.data);
} , [subject, week_day, time]);

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader
        title="Estes são os proffys disponíveis."
        headerTitle="Estudar"
        imgIcon={smileIcon}
        imgIconDesc="Nós temos 23 professores."
        style={{margin: '0'}}
      >
        <Form  ref={formRef} id="search-teachers" onSubmit={searchTeachers}>
          <Select
            title="Selecione"
            style={{width: '231px'}}
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

          <Select
            title="Selecione"
            style={{width: '231px'}}
            name="week_day"
            label="Dia da semana"
            value={week_day}
            onChange={(e) => {
              setWeekDay(e.target.value);
            }}
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

          <InputLabel name="time" title="Horário" style={{margin: '0'}}>
            <Input
              style={
                {
                  width: '242px',
                  height: '56px',
                  borderRadius: '8px',
                  padding: '0 30px',
                }
              }
              type="time"
              name="time"
              value={time}
              onChange={(e) => {
                setTime(e.target.value);
              }}
              />
          </InputLabel>

        </Form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />;
        })}
      </main>
    </div>
  );
};

export default TeacherList;
