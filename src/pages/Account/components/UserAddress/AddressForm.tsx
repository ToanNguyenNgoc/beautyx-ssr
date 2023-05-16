import { AppContext, AppContextType } from 'context/AppProvider';
import { HeadTitle } from 'pages/Account';
import { useContext, useState } from 'react';
import style from './address.module.css'
import { Input } from 'components/Layout';
import { Dialog } from '@mui/material';

function AddressForm() {
  const { t } = useContext(AppContext) as AppContextType
  const [open, setOpen] = useState(false)
  return (
    <>
      <HeadTitle
        title={t('acc.create_address')}
      />
      <div className={style.container}>
        <div className={style.form}>
          <div className={style.form_row}>
            <label className={style.form_row_label}>input_address</label>
            <div className={style.input_address}>input_address</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddressForm;