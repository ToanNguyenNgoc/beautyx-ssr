import { Container } from "@mui/material";
import React from "react";
import ButtonCus from "../../components/ButtonCus";
import icon from "../../constants/icon";
import Bottom from "../../featuresMobile/Bottom";
import Footer from "../Footer";
import Head from "../Head";
import HeadTitle from "../HeadTitle";
import "./merchantComment.css";
import MerchantCommentItem from "./MerchantCommentItem";

export default function MerchantComment() {
  const dataComment: any = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
  ];
  return (
    <div>
      <HeadTitle title={"Tất cả đánh giá"} />
      <Head />
      <Container>
        <div className="merchantComment">
          <div className="merchantComment-left">
            <div className="merchantComment-left__vote">
              <span className="vote-star">5.0</span>
              <div className="all-star">
                <img src={icon.star} alt="" />
                <img src={icon.star} alt="" />
                <img src={icon.star} alt="" />
                <img src={icon.star} alt="" />
                <img src={icon.star} alt="" />
              </div>
              <span className="evaluate">189 đánh giá</span>
            </div>
            <div className="merchantComment-left__evaluates">
              <div className="merchantComment-left__item">
                <span>Xuất sắc</span>
                <div className="line"></div>
                <div className="total">175</div>
              </div>
              <div className="merchantComment-left__item">
                <span>Rất tốt</span>
                <div className="line"></div>
                <div className="total">11</div>
              </div>
              <div className="merchantComment-left__item">
                <span>Trung bình</span>
                <div className="line"></div>
                <div className="total">1</div>
              </div>
              <div className="merchantComment-left__item">
                <span>Tồi</span>
                <div className="line"></div>
                <div className="total">1</div>
              </div>
              <div className="merchantComment-left__item">
                <span>Tồi tệ</span>
                <div className="line"></div>
                <div className="total">1</div>
              </div>
            </div>
          </div>
          <div className="merchantComment-right">
            <div className="sign-form__box">
              <img className="sign-form__box-icon " src={icon.chatAll} alt="" />
              <input
                autoComplete="off"
                // value={formikContact.values.business}
                // onChange={formikContact.handleChange}
                name="business"
                id="business"
                placeholder="Bình luận"
              />
            </div>
            <div className="merchantComment-right__btn">
              <ButtonCus
                // onClick={popupSignInClick}
                text="Bộ lọc"
                backColor="var(--bg-color)"
                border="1px solid var(--purple)"
                color="var(--purple)"
                fontSize="14px"
                lineHeight="20px"
                borderRadius="20px"
                padding="6px 22px"
              />
              <ButtonCus
                // onClick={popupSignInClick}
                text="Tất cả"
                backColor="var(--bg-color)"
                border="1px solid var(--purple)"
                color="var(--purple)"
                fontSize="14px"
                lineHeight="20px"
                borderRadius="20px"
                padding="6px 22px"
              />
              <ButtonCus
                // onClick={popupSignInClick}
                text="Gần nhất"
                backColor="var(--bg-color)"
                border="1px solid var(--purple)"
                color="var(--purple)"
                fontSize="14px"
                lineHeight="20px"
                borderRadius="20px"
                padding="6px 22px"
              />
            </div>
            <div className="merchantComment-right__comment">
              {dataComment.map((item: any) => (
                <MerchantCommentItem key={item.id} />
              ))}
            </div>
          </div>
        </div>
      </Container>

      <Footer />
      <Bottom />
    </div>
  );
}
