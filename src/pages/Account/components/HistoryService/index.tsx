import ButtonCus from "../../../../components/ButtonCus";
import icon from "../../../../constants/icon";
import ServiceItem from "./components/ServiceItem";
import "./style.css";
const dataService = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
];
function Service(props: any) {
  return (
    <div className="service">
      <h1 className="title text-color-purple">Gói dịch vụ</h1>
      <div className="service-status">
        <div className="service-tab">
          <span>Trạng thái:</span>
          <div className="service-btn">
            <ButtonCus
              text="Đã đặt hẹn"
              fontSize="14px"
              lineHeight="20px"
              color="var(--purple)"
              border="solid 1px var(--purple)"
              borderRadius="26px"
              backColor="transparent"
            />
            <ButtonCus
              text="Chưa đặt hẹn"
              fontSize="14px"
              lineHeight="20px"
              color="#ffffff"
              border="solid 1px var(--purple)"
              borderRadius="26px"
              backColor="var(--purple"
            />
          </div>
        </div>
        <div className="service-edit">
          <span>Chỉnh sửa</span>
          <img src={icon.edit} alt="" />
        </div>
      </div>
      <div className="service-list">
        {dataService.map((item) => (
          <ServiceItem key={item.id} />
        ))}
      </div>
    </div>
  );
}
export default Service;
