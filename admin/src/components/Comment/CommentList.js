import * as React from 'react';
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
  Filter,
  TextInput,
  EmailField,
} from 'react-admin';

const CommentFilter = props => (
  <Filter {...props}>
    <TextInput label='Search' source='q' alwaysOn />
  </Filter>
);

export const CommentList = props => (
  <List filters={<CommentFilter />} {...props}>
    <Datagrid>
      <TextField source='name' />
      <EmailField source='email' />
      <TextField source='title' />
      <DateField source='createdAt' />
      <DateField source='updatedAt' />
      <EditButton basePath='/comments' />
      <DeleteButton basePath='/comments' />
    </Datagrid>
  </List>
);
