import * as React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  Filter,
  TextInput,
} from 'react-admin';

const CategoryFilter = props => (
  <Filter {...props}>
    <TextInput label='Search' source='q' alwaysOn />
  </Filter>
);

export const CategoryList = props => (
  <List filters={<CategoryFilter />} {...props}>
    <Datagrid>
      <TextField source='name' />
      <TextField source='slug' />
      <EditButton basePath='/category' />
      <DeleteButton basePath='/category' />
    </Datagrid>
  </List>
);
