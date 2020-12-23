import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import { PostList } from './components/PostList';
import { UserList } from './components/UserList';
import PostIcon from '@material-ui/icons/Book';
import Dashboard from './Dashboard';
import authProvider from './authProvider';
import simpleRestProvider from 'ra-data-simple-rest';
import PostCreate from './components/PostCreate';
import PostEdit from './components/PostEdit';
import UserIcon from '@material-ui/icons/Group';

const App = () => (
  <Admin
    dashboard={Dashboard}
    authProvider={authProvider}
    dataProvider={simpleRestProvider('http://localhost:3000/api')}
  >
    <Resource
      name='posts'
      list={PostList}
      icon={PostIcon}
      create={PostCreate}
      edit={PostEdit}
    />

    <Resource name='users' list={UserList} icon={UserIcon} />
  </Admin>
);

export default App;
