import React from 'react';
import Form from "common/src/components/shared/form";
import Container from "common/src/components/shared/container";
import Input from "./input";
import Buttons from './buttons';

const ChangeEmail = ({
  email,
  password,
  handleChanges,
  handleSubmit,
}) =>
  <Container>
    <Form
      title='Change email'
      onSubmit={handleSubmit}
    >
      <Input
        id='email'
        label='Email :'
        type='email'
        value={email}
        onChange={handleChanges}
        autocomplete='off'
      />
      <Input
        id='password'
        type='password'
        label='Current password :'
        value={password}
        onChange={handleChanges}
        autocomplete='off'
      />
      <Buttons
        submitLabel={'Update'}
        cancelLabel={'Cancel'}
      />
    </Form>
  </Container>

export default ChangeEmail;