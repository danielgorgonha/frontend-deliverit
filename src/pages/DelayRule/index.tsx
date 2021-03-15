import React, { useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Container } from '../../components/Container';
import { Modal } from '../../components/Modal';
import { Input } from '../../components/Input';

import '../styles.scss';

import { Api } from '../../services/api';
import { showError } from '../../Errors/AppError';
import Select from '../../components/Select';

interface List {
  id: string;
  title: string;
  day: number;
  equality: string;
  penalty_value: number;
  interest_per_day: number;
}

const DelayRule: React.FC = () => {
  const [list, setList] = useState<List[]>([]);
  const [modal, setModal] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const handleClick = () => {
    setModal(true);
  }
  const handleSubmit: SubmitHandler = async (data, { reset }) => {
    try {
      await Api.post("/delayrule", data);
      setModal(false);
    } catch (err) {
      console.log(err);
      //showError(err);
    }
  }

  useEffect(() => {
    try {
      (async () => {
        const response = await Api.get("/delayrule");
        setList(response.data);
      })();
    } catch(err) {
      console.log(err);
    }
  }, []);
  return (
    <>
      <Container>
        <div>
          <button className="button-click" type="button" onClick={handleClick}>
            Cadastrar
          </button>
        </div>
        <div>
          {modal && (
            <Modal
              id="modal_form"
              onClose={() => setModal(false)}
              title="Cadastro de Regras de Atraso"
            >
              <Form ref={formRef} onSubmit={handleSubmit}>
                <div className="fieldset">
                  <Input name="title" placeholder="Titulo" />
                </div>
                <div className="fieldset">
                  <Select 
                    name="equality" 
                    placeholder="Iqualdade"
                    options={
                      [
                        { 
                          value: 'Equal', 
                          label: 'Iqual'
                        },
                        { 
                          value: 'MoreThan', 
                          label: 'Maior que'
                        },
                        { 
                          value: 'MoreThanOrEqual', 
                          label: 'Maior ou Iqual'
                        }
                      ]
                    }
                    onChange={(e) => e}
                  />
                </div>
                <div className="fieldset">
                  <Input name="day" placeholder="Dia"/>
                </div>
                <div className="fieldset">
                  <Input name="penalty_value" placeholder="Multa" />
                </div>
                <div className="fieldset">
                  <Input name="interest_per_day" placeholder="Juros / Dias" />
                </div>
                <div className="fieldset">
                  <button className="btn" type="submit">Salvar</button>
                </div>
              </Form>
            </Modal>
          )}
        </div>
      </Container>
      <br />
      <Container>
        <h1>Listagem</h1>
        <br />
        <div>
          <table>
            <thead>
              <tr>
                <th>Titulo</th>
                <th>Iqualdade</th>
                <th>Dia</th>
                <th>Multa</th>
                <th>Juros / Dias</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
                {list && list.map((list) => {
                  return (
                      <>
                        <tr key={list.id}>
                          <td>{list.title}</td>
                          <td>{list.equality}</td>
                          <td>{list.day}</td>
                          <td>{list.penalty_value}</td>
                          <td>{list.interest_per_day}</td>
                          <td>Editar | Excluir</td>
                        </tr>
                      </>
                  );  
                })}
            </tbody>
          </table>
        </div>
      </Container>
    </>
  );
}

export { DelayRule };