import { useDeviceMobile } from 'hooks';
import React from 'react';
import { EXTRA_FLAT_FORM } from '../../api/extraFlatForm';
import { FLAT_FORM_TYPE } from '../../rootComponents/flatForm'

interface IProps {
      title?: string
}

function HeadTitle(props: IProps) {
      const IS_MB = useDeviceMobile();
      const { title } = props;
      const FLAT_FORM = EXTRA_FLAT_FORM();

      let t: string = "BeautyX";
      if (IS_MB) {
            document.title = t
      }
      else {
            document.title = FLAT_FORM === FLAT_FORM_TYPE.MOMO ? 'BeautyX' : `${title ?? '【BeautyX】- App đặt lịch làm đẹp online với nhiều địa điểm uy tín gần bạn'} - ${FLAT_FORM}`
      }
      return (
            <></>
      );
}

export default HeadTitle;