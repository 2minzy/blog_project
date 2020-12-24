import React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';

const CommentEdit = props => {
  return (
    <Edit title='Edit Comment' {...props}>
      <SimpleForm redirect='list'>
        <TextInput source='name' />
        <TextInput source='email' />
        <TextInput source='title' />
        <TextInput multiline source='body' />
      </SimpleForm>
    </Edit>
  );
};

export default CommentEdit;
