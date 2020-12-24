import React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';

const PostEdit = props => {
  return (
    <Edit title='Edit Post' {...props}>
      <SimpleForm redirect='list'>
        <TextInput source='title' />
        <TextInput multiline source='body' />
        <TextInput source='tags' />
      </SimpleForm>
    </Edit>
  );
};

export default PostEdit;
