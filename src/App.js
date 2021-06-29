import "./App.css";
import { Formik, Field, Form } from "formik";

import schema from "./schema";

function App() {
  function onSubmit(values, actions) {
    console.log("Submiting...", values);
  }

  function onBlurCep(event, setFieldValue) {
    const { value } = event.target;

    const cep = value?.replace(/[^0-9]/g, "");

    if (cep?.length !== 8) {
      return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json())
      .then((data) => {
        setFieldValue("bairro", data.bairro);
        setFieldValue("cidade", data.localidade);
        setFieldValue("rua", data.logradouro);
        setFieldValue("uf", data.uf);
        setFieldValue("numero", data.numero);
      });
  }

  return (
    <div className="App">
      <Formik
        validationSchema={schema}
        onSubmit={onSubmit}
        initialValues={{
          cep: "",
          rua: "",
          numero: "",
          bairro: "",
          cidade: "",
          uf: "",
        }}
        render={({ isValid, setFieldValue, values }) => (
          <Form>
            <div className="form-control-group">
              <label>CEP</label>
              <Field
                name="cep"
                type="text"
                onBlur={(ev) => onBlurCep(ev, setFieldValue)}
              />
            </div>

            <div className="form-control-group">
              <label>RUA</label>
              <Field name="rua" type="text" />
            </div>

            <div className="form-control-group">
              <label>Número</label>
              <Field name="numero" type="text" />
            </div>

            <div className="form-control-group">
              <label>Bairro</label>
              <Field name="bairro" type="text" />
            </div>

            <div className="form-control-group">
              <label>Cidade</label>
              <Field name="cidade" type="text" />
            </div>

            <div className="form-control-group">
              <label>Estado</label>
              <Field component="select" name="uf">
                <option value={null}>Selecione o Estado</option>
                <option value="SP">São Paulo</option>
                <option value="GO">Goiás</option>
              </Field>
            </div>
            <button type="submit">Enviar</button>
          </Form>
        )}
      ></Formik>
    </div>
  );
}

export default App;
