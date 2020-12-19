import * as React from 'react';
import { List, Datagrid, TextField, EmailField, DateField } from 'react-admin';

export const UserList = props => (
  <List {...props}>
    <Datagrid rowClick='edit'>
      <TextField source='id' />
      <TextField source='name' />
      <EmailField source='email' />
      <TextField source='role' />
      <DateField source='createdAt' />
      <DateField source='updatedAt' />
    </Datagrid>
  </List>
);
