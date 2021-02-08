import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Route from './Route';

import Dashboard from '../pages/Dashboard';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import TeacherList from '../pages/TeacherList';
import TeacherForm from '../pages/TeacherForm';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/forgot-password" exact component={ForgotPassword} />

      <Route path="/dashboard" component={Dashboard} isPrivate/>
      <Route path="/study" component={TeacherList} isPrivate/>
      <Route path="/give-classes" component={TeacherForm} isPrivate/>
    </BrowserRouter>
  );
};

export default Routes;
