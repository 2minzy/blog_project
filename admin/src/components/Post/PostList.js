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
  ReferenceInput,
  SelectInput,
} from 'react-admin';

const PostFilter = props => (
  <Filter {...props}>
    <TextInput label='Search' source='q' alwaysOn />
    {/* <ReferenceInput label='User' source='userId' reference='users' allowEmpty>
      <SelectInput optionText='name' />
    </ReferenceInput> */}
  </Filter>
);

export const PostList = props => (
  <List filters={<PostFilter />} {...props}>
    <Datagrid>
      <TextField source='title' />
      <TextField label='Publisher' source='publisher.name' />
      <DateField source='createdAt' />
      <DateField source='updatedAt' />
      <EditButton basePath='/posts' />
      <DeleteButton basePath='/posts' />
    </Datagrid>
  </List>
);
