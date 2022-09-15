import icon from "../../../constants/icon";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
//import CheckNotification from "./CheckNotification";
import { AppContext } from "../../../context/AppProvider";
import mediaApi from "../../../api/mediaApi";
import authentication from "../../../api/authApi";
import { useDispatch, useSelector } from 'react-redux';
import onErrorImg from "../../../utils/errorImg";
import { putUser } from '../../../redux/USER/userSlice'

interface info {
  name?: string;
  avatar?: string;
  token?: any;
  point?: Number;
  amount?: any;
  rank?: string;
}
function MenuSideBar(props: info) {

  const {
    t,
    setSign,
  } = useContext(AppContext);

  const dispatch = useDispatch();
  const USER = useSelector((state: any) => state.USER.USER)

  const data: info = {
    point: 200,
    amount: 200,
    rank: "Vàng",
  };
  const history = useHistory();

  // const handleDropdown = (e: any) => {
  //   if (e.target.classList.value.indexOf("active") !== -1) {
  //     e.target.classList.remove("active");
  //   } else {
  //     e.target.classList.add("active");
  //   }
  // };
  const handleSignOut = () => {
    setSign(false);
    const token = "";
    localStorage.setItem("_WEB_TK", token);
  };
  const onFileChange = (e: any) => {
    const form = e.target.files[0];
    handlePostMedia(form)
  }
  const handlePostMedia = async (form: any) => {
    let formData = new FormData();
    formData.append('file', form);
    try {
      const res = await mediaApi.postMedia(formData);
      const action = putUser({ ...USER, avatar: res.data.context.original_url })
      dispatch(action)
      const model_id = await res.data.context.model_id;
      const params = {
        media_id: model_id
      }
      await authentication.putUserProfile(params)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="infor_section">
        <div className="avatar">
          <div className="img_mask">
            <img src={USER?.avatar}
              onError={(e) => onErrorImg(e)}
              alt="img"
            />
          </div>
          <div className="camera_icon">
            <label htmlFor="file">
              <img src={icon.Camera_purple} alt="icon" />
            </label>
          </div>
          <input
            hidden
            id="file"
            type="file"
            name="file"
            accept="image/jpeg"
            onChange={onFileChange}
          />
        </div>
        <div className="info">
          <p className="quicksand-xl">
            <b>{USER?.fullname}</b>
          </p>
          {/* <div className="other_stuff text-bold quicksand-md">
            <div className="point">
              <img src={icon.Ticket} alt="" />
              <div className="content">
                <span className="quicksand-sm text-color-grey">
                  {t("acc.scores")}
                </span>
                <span>{data.point}</span>
              </div>
            </div>
            <div className="amount">
              <img src={icon.Wallet} alt="" />
              <div className="content">
                <span className="quicksand-sm text-color-grey">
                  {t("acc.surplus")}
                </span>
                <span>
                  {data.amount}.000{" "}
                  <span style={{ textDecoration: "underline" }}>đ</span>
                </span>
              </div>
            </div>
            <div className="rank">
              <img src={icon.Crown} alt="" />
              <div className="content">
                <span className="quicksand-sm text-color-grey">
                  {t("acc.rank")}
                </span>
                <span>{data.rank}</span>
              </div>
            </div>
          </div> */}
        </div>
        <div
          className="tab"
          onClick={() => history.push("/tai-khoan/thong-tin-ca-nhan")}
        >
          <div className="icon">
            <img src={icon.User_purple} alt="" />
          </div>
          <span className="quicksand-md text-bold">{t("Header.my_acc")}</span>
        </div>
        <div
          className="tab"
          onClick={() => history.push("/tai-khoan/phuong-thuc-thanh-toan")}
        >
          <div className="icon">
            <img src={icon.Credit_card} alt="" />
          </div>
          <span className="quicksand-md text-bold">
            {t("pm.payment_method")}
          </span>
        </div>
        <div
          className="tab"
          onClick={() => history.push("/tai-khoan/lich-su-mua")}
        >
          <div className="icon">
            <img src={icon.Clock_purple} alt="" />
          </div>
          <span className="quicksand-md text-bold">{t("Header.my_order")}</span>
        </div>
        <div className="tab" onClick={() => history.push("/lich-hen?tab=2")}>
          <div className="icon">
            <img src={icon.bag} alt="" />
          </div>
          <span className="quicksand-md text-bold">{t("app.my_services")}</span>
        </div>
        {/* <div className="dropdown">
          <div className="tab" onClick={handleDropdown}>
            <div className="icon">
              <img src={icon.Clock_purple} alt="" />
            </div>
            <span className="quicksand-md text-bold pointer-events-none">
              Lịch sử đơn hàng
            </span>
          </div>
          <ul>
            <li style={{ margin: "8px 0" }}>
              <div
                className="cursor-pointer"
                onClick={() => history.push("/tai-khoan/goi-dich-vu")}
              >
                <span className="quicksand-md">Gói dịch vụ</span>
              </div>
            </li>
            <li style={{ marginBottom: "8px" }}>
              <div
                className="cursor-pointer"
                onClick={() => history.push("/tai-khoan/san-pham")}
              >
                <span className="quicksand-md">Sản phẩm</span>
              </div>
            </li>
            <li>
              <div
                className="cursor-pointer"
                onClick={() => history.push("/tai-khoan/combo")}
              >
                <span className="quicksand-md">Combo</span>
              </div>
            </li>
          </ul>
        </div> */}
        <div onClick={() => history.push('/tai-khoan/ma-uu-dai')} className="tab">
          <div className="icon">
            <img src={icon.Ticket} alt="" />
          </div>
          <span className="quicksand-md text-bold">{t("Header.my_codes")}</span>
        </div>
        <div className="tab">
          <div className="icon">
            <img src={icon.Bell} alt="" />
          </div>
          <span className="quicksand-md text-bold">{t("Header.noti")}</span>
        </div>
        {/* <div className="dropdown">
          <div className="tab" onClick={handleDropdown}>
            <div className="icon">
              <img src={icon.Union} alt="" />
            </div>
            <span className="quicksand-md text-bold pointer-events-none">
              {t("Header.settings")}
            </span>
          </div>

          <ul>
            <li>
              <span className="quicksand-md">Nhận thông báo</span>
              <CheckNotification />
            </li>
            <li>
              <span className="quicksand-md">Ngôn ngữ</span>
              <div className="lang">
                <span className="quicksand-md text-color-grey">Tiếng Việt</span>
                <CheckNotification />
              </div>
            </li>
          </ul>
        </div> */}
        <div className="tab">
          <div className="icon">
            <img src={icon.Headphones_purple} alt="" />
          </div>
          <span className="quicksand-md text-bold">{t("Header.support")}</span>
        </div>
        <div onClick={handleSignOut} className="logout">
          <img src={icon.SignOutPurple} alt="" />
          <span className="quicksand-md text-bold text-color-purple">
            {t("Header.sign_out")}
          </span>
        </div>
      </div>
    </div>
  );
}
export default MenuSideBar;
