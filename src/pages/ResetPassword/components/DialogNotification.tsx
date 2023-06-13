import React from 'react';
import { Dialog } from '@mui/material';
import { useHistory } from 'react-router-dom'


function DialogNotification(props: any) {
    const { errorCode, setErrorCode } = props;
    const history = useHistory();
    const onBackSignIn = () => {
        history.replace({
            pathname: "/sign-in",
            search: "1",
        });
    }
    const onCheck = () => {
        switch (errorCode.code) {
            case 200:
                return <div>
                    <div className="flex-column for-er-no">
                        Trang web sẽ đưa bạn về trang đăng nhập
                        <span onClick={onBackSignIn} >Trở về đăng nhập</span>
                    </div>
                </div>
            case 400:
                return <div className="for-er-no">
                    {errorCode.title}
                </div>
            default:
                break
        }
    }
    return (
        <Dialog
            open={errorCode.open}
            onClose={() => setErrorCode({ ...errorCode, open: false })}
        >
            <div className="flex-column dia-no-cnt">
                <span className='dia-no-cnt__head' >
                    Thông báo
                </span>
                {onCheck()}
            </div>
        </Dialog>
    );
}

export default DialogNotification;