import React from 'react';
import {
  Edit,
  PasswordInput,
  SelectInput,
  SimpleForm,
  TextInput,
} from 'react-admin';

const UserEdit = props => {
  return (
    <Edit title='Edit User' {...props}>
      <SimpleForm redirect='list'>
        <TextInput disabled source='id' />
        <TextInput source='name' />
        <TextInput source='email' />
        <PasswordInput source='password' initiallyVisible />
        <SelectInput
          source='role'
          choices={[
            { id: 'author', name: 'Author' },
            { id: 'admin', name: 'Admin' },
          ]}
        />
      </SimpleForm>
    </Edit>
  );
};

export default UserEdit;
