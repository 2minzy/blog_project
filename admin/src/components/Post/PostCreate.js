import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

const PostCreate = props => {
  return (
    <Create title='Create a Post' {...props}>
      <SimpleForm redirect='list'>
        <TextInput source='title' />
        <TextInput multiline source='body' />
        <TextInput source='tags' />
      </SimpleForm>
    </Create>
  );
};

export default PostCreate;
