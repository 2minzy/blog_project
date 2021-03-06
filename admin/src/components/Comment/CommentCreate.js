import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

const CommentCreate = props => {
  return (
    <Create title='Create a Comment' {...props}>
      <SimpleForm redirect='list'>
        <TextInput source='name' />
        <TextInput source='email' />
        <TextInput source='title' />
        <TextInput multiline source='body' />
      </SimpleForm>
    </Create>
  );
};

export default CommentCreate;
