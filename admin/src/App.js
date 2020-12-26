import * as React from 'react';
import { Admin, Resource, fetchUtils } from 'react-admin';
import { PostList } from './components/Post/PostList';
import { UserList } from './components/User/UserList';
import { CommentList } from './components/Comment/CommentList';
import { CategoryList } from './components/Category/CategoryList';
import UserCreate from './components/User/UserCreate';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import ChatIcon from '@material-ui/icons/Chat';
import CategoryIcon from '@material-ui/icons/Category';
import Dashboard from './Dashboard';
import authProvider from './authProvider';
import simpleRestProvider from 'ra-data-simple-rest';
import PostCreate from './components/Post/PostCreate';
import PostEdit from './components/Post/PostEdit';
import UserEdit from './components/User/UserEdit';
import CommentCreate from './components/Comment/CommentCreate';
import CommentEdit from './components/Comment/CommentEdit';
import CategoryCreate from './components/Category/CategoryCreate';
import CategoryEdit from './components/Category/CategoryEdit';
import MyLoginPage from './MyLoginPage';

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('token');
  options.headers.set('Authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

const dataProvider = simpleRestProvider(
  'http://localhost:3000/api',
  httpClient
);

const App = () => (
  <Admin
    dashboard={Dashboard}
    loginPage={MyLoginPage}
    authProvider={authProvider}
    dataProvider={dataProvider}
  >
    <Resource
      name='posts'
      list={PostList}
      icon={PostIcon}
      create={PostCreate}
      edit={PostEdit}
    />

    <Resource
      name='users'
      list={UserList}
      icon={UserIcon}
      create={UserCreate}
      edit={UserEdit}
    />

    <Resource
      name='comments'
      list={CommentList}
      icon={ChatIcon}
      create={CommentCreate}
      edit={CommentEdit}
    />

    <Resource
      name='category'
      list={CategoryList}
      icon={CategoryIcon}
      create={CategoryCreate}
      edit={CategoryEdit}
    />
  </Admin>
);

export default App;
