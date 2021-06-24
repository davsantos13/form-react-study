import './App.css';
import { Formik, Field, Form, ErrorMessage } from 'formik'


import schema from './schema';

function App() {

  function onSubmit(values, actions) {
    console.log('Submiting...', values);
  }



  return (
    <div className="App">
      <Formik
        validationSchema={schema}
        onSubmit={onSubmit}
        initialValues={{
          name: '',
          email: ''
        }}
        render={({ values, errors, touched, isValid }) => (
          <Form>
            <div>
              <label>Nome</label>
              <Field name="name" type="text" />
              <ErrorMessage name="name" />

            </div>
            <div>
              <label>Email</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" />

            </div>
            <button type="submit" disabled={!isValid}>Enviar</button>
          </Form>
        )}
      >

      </Formik>
    </div>
  );
}

export default App;
