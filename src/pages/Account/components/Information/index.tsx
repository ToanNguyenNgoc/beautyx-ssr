import React, { useContext, useState } from "react";
import ButtonCus from "../../../../components/ButtonCus";
import DialogChangePass from "./components/DialogChangePass";
import DialogNewPass from "./components/DialogNewPass";
import "./style.css";
import { AppContext } from '../../../../context/AppProvider';
import Address from "../UserAddress";
import FormInfo from "./components/FormInfo";
///import Form from "./components/Form";


function Information(props: any) {
  const { t } = useContext(AppContext)
  const [openChangePass, setOpenChangePass] = useState(false);
  const [openNewPass, setOpenNewPass] = React.useState(false);

  // Open Change Pass
  const handleOpenChange = () => {
    setOpenChangePass(true);
  };
  // Open New Pass
  const handleOpenNewPass = () => {
    setOpenNewPass(true);
  };

  return (
    <div className="info_section">
      {/* <Form/> */}
      <FormInfo />
      <div className="btn-success">
        <ButtonCus
          onClick={handleOpenChange}
          text={t('acc.change_pass')}
          fontSize="14px"
          lineHeight="20px"
          color="var(--purple)"
          border="solid 1px var(--purple)"
          borderRadius="26px"
          backColor="transparent"
        />
      </div>
      <hr className="purple_line" />
      <Address
      />
      <DialogChangePass
        openChangePass={openChangePass}
        setOpenChangePass={setOpenChangePass}
        handleOpenNewPass={handleOpenNewPass}
      />
      <DialogNewPass
        openNewPass={openNewPass}
        setOpenNewPass={setOpenNewPass}
      />
    </div>
  );
}
export default Information;
