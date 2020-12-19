import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import { PostList } from './posts';
import PostIcon from '@material-ui/icons/Book';
import Dashboard from './Dashboard';
import authProvider from './authProvider';
import simpleRestProvider from 'ra-data-simple-rest';

const App = () => (
  <Admin
    dashboard={Dashboard}
    authProvider={authProvider}
    dataProvider={simpleRestProvider('http://localhost:3000/api/')}
  >
    <Resource name='posts' list={PostList} icon={PostIcon} />
    {/* <Resource name='users' list={UserList} icon={UserIcon} /> */}
  </Admin>
);

export default App;
