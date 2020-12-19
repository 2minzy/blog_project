import * as React from 'react';
import { List, Datagrid, TextField, DateField } from 'react-admin';

export const PostList = props => (
  <List {...props}>
    <Datagrid>
      <TextField source='title' />
      <DateField source='createdAt' />
      <DateField source='updatedAt' />
    </Datagrid>
  </List>
);
