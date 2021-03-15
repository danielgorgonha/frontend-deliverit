import React, { useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Container } from '../../components/Container';
import { Modal } from '../../components/Modal';
import { Input } from '../../components/Input';

import '../styles.scss';

import { Api } from '../../services/api';
import { showError } from '../../Errors/AppError';

interface List {
  id: string;
  name: string;
  original_value: number;
  expiration_date: Date;
  payment_date: Date;
  corrected_value: number;
  number_days_late: number;
}

const BillsToPay: React.FC = () => {
  const [list, setList] = useState<List[]>([]);
  const [modal, setModal] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const handleClick = () => {
    setModal(true);
  }
  const handleSubmit: SubmitHandler = async (data, { reset }) => {
    try {
      await Api.post("/billtopay", data);
      setModal(false);
    } catch (err) {
      console.log(err);
      //showError(err);
    }
  }

  useEffect(() => {
    try {
      (async () => {
        const response = await Api.get("/billtopay");
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
              title="Cadastro de Contas a Pagar"
            >
              <Form ref={formRef} onSubmit={handleSubmit}>
                <div className="fieldset">
                  <Input name="name" placeholder="Nome da conta" />
                </div>
                <div className="fieldset">
                  <Input name="original_value" placeholder="Valor original" />
                </div>
                <div className="fieldset">
                  <Input name="expiration_date" placeholder="Data vencimento"/>
                </div>
                <div className="fieldset">
                  <Input name="payment_date" placeholder="Data pagamento" />
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
                <th>Nome</th>
                <th>Valor Original</th>
                <th>Valor Corrigido</th>
                <th>Quantidade de dias de atraso</th>
                <th>Data de Pagamento</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
                {list && list.map((list) => {
                  return (
                      <>
                        <tr key={list.id}>
                          <td>{list.name}</td>
                          <td>{list.original_value}</td>
                          <td>{list.corrected_value}</td>
                          <td>{list.number_days_late}</td>
                          <td>{list.payment_date}</td>
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

export { BillsToPay };