import { toast } from 'react-toastify';

const showError = (err: any) => {
  if(err.response.data.msg) {
    toast.error(err.response.data.msg);
  } else {
    toast.error('Falha ao concluir. Tente novamente mais tarde!');
  }
};

export { showError };