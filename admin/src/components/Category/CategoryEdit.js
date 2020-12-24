import React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';

const CategoryEdit = props => {
  return (
    <Edit title='Edit a Category' {...props}>
      <SimpleForm redirect='list'>
        <TextInput source='name' />
      </SimpleForm>
    </Edit>
  );
};

export default CategoryEdit;
