import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { withStyles } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import * as Yup from 'yup';

import logo from '../../assets/iPetLogo.png';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

const GreenCheckBox = withStyles({
  root: {
    color: orange[400],
    '&$checked': {
      color: orange[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function SignUp() {
  const [storeChecked, setStoreChecked] = useState(false);

  function handleSubmit(data) {
    const { name, email, password } = data;
    console.log(name, email, password, storeChecked);
  }

  return (
    <>
      <img src={logo} alt="ipet" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome" />
        <Input name="email" type="email" placeholder="Email" />
        <Input name="password" type="password" placeholder="Senha" />
        <FormControlLabel
          className="check"
          control={
            <GreenCheckBox
              checked={storeChecked}
              onChange={(e) => setStoreChecked(e.target.checked)}
            />
          }
          label="Quero cadastrar meu estabelecimento"
        />

        <button type="submit">Salvar</button>
        <Link to="/">Já tenho cadastro</Link>
      </Form>
    </>
  );
}
