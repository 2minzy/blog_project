import React from 'react';
import {
  Create,
  SimpleForm,
  PasswordInput,
  SelectInput,
  TextInput,
} from 'react-admin';

const UserCreate = ({ ...props }) => {
  return (
    <Create title='Create a user' {...props} key={props.id}>
      <SimpleForm redirect='list' defaultValue={{ role: 'user' }}>
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
    </Create>
  );
};

export default UserCreate;
