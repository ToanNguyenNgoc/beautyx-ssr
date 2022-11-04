import React, { useContext } from 'react';
import { Slide, Dialog } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions';
import Information from '../../../../pages/Account/components/Information/index';
import HeadMobile from '../../../../features/HeadMobile';
import { AppContext } from '../../../../context/AppProvider';

const Transition = React.forwardRef(function Transition(
      props: TransitionProps & {
            children: React.ReactElement<any, any>;
      },
      ref: React.Ref<unknown>,
) {
      return <Slide direction="left" ref={ref} {...props} />;
});

function AccountForm(props: any) {
      const { open, setOpen } = props;
      const {t} = useContext(AppContext);
      return (
            <Dialog
                  fullScreen
                  TransitionComponent={Transition}
                  open={open}
            >
                  <div
                        style={{ minHeight: '100vh' }}
                  >
                        <HeadMobile onBackFunc={()=>setOpen(false)} title={t("acc.order_address")} />
                        <Information />
                  </div>
            </Dialog>
      );
}

export default AccountForm;