import * as React from 'react';
import {
  List,
  Datagrid,
  TextField,
  TextInput,
  EmailField,
  DateField,
  EditButton,
  DeleteButton,
  Filter,
} from 'react-admin';

const UserFilter = props => (
  <Filter {...props}>
    <TextInput label='Search' source='q' alwaysOn />
    {/* <ReferenceInput label='User' source='userId' reference='users' allowEmpty>
      <SelectInput optionText='name' />
    </ReferenceInput> */}
  </Filter>
);

export const UserList = props => (
  <List filters={<UserFilter />} {...props}>
    <Datagrid rowClick='edit'>
      <TextField source='id' />
      <TextField source='name' />
      <EmailField source='email' />
      <TextField source='role' />
      <DateField source='createdAt' />
      <DateField source='updatedAt' />
      <EditButton basePath='/users' />
      <DeleteButton basePath='/users' />
    </Datagrid>
  </List>
);
