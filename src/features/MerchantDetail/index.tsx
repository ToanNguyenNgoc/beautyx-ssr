/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import "../../assets/styles/main.css";
import LoadOrg from "../../components/LoadingSketion/LoadOrg";
//import { clearServices } from '../../redux/org_services/orgServivesSlice';
//import { clearProducts } from '../../redux/org_products/orgProductsSlice';
import PageNotFound from "../../components/PageNotFound";
// import { IDiscountPar } from "../../interface/discount";
import { addVoucherByOrg } from "../../redux/cartSlice";
import {
  fetchAsyncOrg,
  fetchOrgGalleries,
  onActiveTab
} from "../../redux/org/orgSlice";
import { fetchAsyncOrgDiscounts } from "../../redux/org_discounts/orgDiscountsSlice";
import { onSetEmptyChooseCatePr } from "../../redux/org_products/orgProductsSlice";
import { onSetEmptyChooseCate } from "../../redux/org_services/orgServivesSlice";
import {
  fetchAsyncServicesSpecial,
  fetchProductsSpecial,
  onSaveOrgId
} from "../../redux/org_specials/orgSpecialSlice";
import { STATUS } from "../../redux/status";
import { IS_VOUCHER } from "../../utils/cart/checkConditionVoucher";
import { formatOrgParam } from "../../utils/formatParams";
import useFullScreen from "../../utils/useDeviceMobile";
import Footer from "../Footer";
import Head from "../Head/index";
import HeadTitle from "../HeadTitle/index";
import HeadOrg from "./components/HeadOrg";
import OrgContainer from "./components/OrgContainer";
import OrgDetail from "./components/OrgDetail";
import IStore from "../../interface/IStore";
import "./style.css";
import { analytics, logEvent } from "../../firebase";

type IUseParams = {
  subdomain: string|undefined
}
function MerchantDetail() {
  const IS_MB = useFullScreen();
  const location: any = useLocation();
  const dispatch = useDispatch();
  const param = formatOrgParam(location.pathname);
  const sth = useParams<IUseParams>();
  console.log(sth);
  const { sub_domain } = param;

  const ORG = useSelector((state: IStore) => state.ORG);
  const ORG_SPECIALS = useSelector((state: any) => state.ORG_SPECIALS);
  const { SERVICES_SPECIAL, PRODUCTS_SPECIAL, org_id } = ORG_SPECIALS;
  const { status_ser } = SERVICES_SPECIAL;
  const { status_pr } = PRODUCTS_SPECIAL;
  const ORG_DISCOUNTS = useSelector((state: any) => state.ORG_DISCOUNTS);

  const { org, status, tab, GALLERIES } = ORG;
  const callOrgDetail = () => {
    if (sub_domain !== org?.subdomain) {
      dispatch(fetchAsyncOrg(sub_domain))
      dispatch(onActiveTab(1))
      dispatch(onSetEmptyChooseCatePr())
      dispatch(onSetEmptyChooseCate())
      //dispatch(clearServices())
      //dispatch(clearProducts())
    }
  }
  const callGalleriesOrg = () => {
    if (GALLERIES.org_subdomain !== sub_domain || GALLERIES.status !== STATUS.SUCCESS) {
      dispatch(fetchOrgGalleries(sub_domain))
    }
  }
  const callOrgDiscountsOrg = async () => {
    if (status === STATUS.SUCCESS) {
      if (ORG_DISCOUNTS.org_id !== org.id || ORG_DISCOUNTS.DISCOUNTS.status_list !== STATUS.SUCCESS) {
        const values = { org_id: org.id }
        const res = await dispatch(fetchAsyncOrgDiscounts(values))
        const { discounts } = res.payload;
        if (discounts.length > 0) {
          dispatch(addVoucherByOrg({
            org: org,
            vouchers: IS_VOUCHER(discounts)
          }))
        }
      }
    }
  }
  const callOrgSpecial = () => {
    // if (status === STATUS.SUCCESS) {
    //   const values = {
    //     org_id: sub_domain,
    //     page: 1,
    //     special: true,
    //     isEnable: org?.is_momo_ecommerce_enable && true
    //   }
    //   dispatch(onSaveOrgId(sub_domain))
    //   if (sub_domain !== org_id || status_ser !== STATUS.SUCCESS) {
    //     dispatch(fetchAsyncServicesSpecial(values));
    //   }
    //   if (sub_domain !== org_id || status_pr !== STATUS.SUCCESS) {
    //     dispatch(fetchProductsSpecial(values))
    //   }
    // }
    const values = {
      org_id: sub_domain,
      page: 1,
      special: true,
      special_ecommerce: true,
      isEnable: org?.is_momo_ecommerce_enable && true
    }
    dispatch(onSaveOrgId(sub_domain))
    if (sub_domain !== org_id || status_ser !== STATUS.SUCCESS) {
      dispatch(fetchAsyncServicesSpecial(values));
    }
    if (sub_domain !== org_id || status_pr !== STATUS.SUCCESS) {
      dispatch(fetchProductsSpecial(values))
    }
  }
  useEffect(() => {
    callOrgDiscountsOrg()
  }, [status])
  useEffect(() => {
    callOrgDetail()
    callGalleriesOrg()
    logEvent(analytics,'detail_merchant', {
      merchant: org.name
    })
  }, [sub_domain])

  useEffect(() => {
    if (
      ORG_DISCOUNTS.DISCOUNTS.status_list === STATUS.SUCCESS &&
      status_ser === STATUS.SUCCESS &&
      status_pr === STATUS.SUCCESS
    ) {
      if (
        ORG_DISCOUNTS.DISCOUNTS.totalItem === 0 &&
        SERVICES_SPECIAL.totalItem === 0 &&
        PRODUCTS_SPECIAL.totalItem === 0 &&
        IS_VOUCHER(ORG_DISCOUNTS.DISCOUNTS.discounts).length === 0
      ) {
        dispatch(onActiveTab(tab === 1 ? 2 : tab));
      }
    }
  }, [ORG_DISCOUNTS.DISCOUNTS, SERVICES_SPECIAL, PRODUCTS_SPECIAL]);

  let loading = false;
  if (status === STATUS.LOADING && GALLERIES.org_subdomain !== sub_domain) {
    loading = true
  }

  return (
    <div className="mb-cnt">
      {loading === true && <LoadOrg />}
      {!ORG.org && <PageNotFound />}
      <HeadTitle title={org?.name ? org.name : "Đang tải..."} />
      {IS_MB ? <HeadOrg org={org} isShowSearch={true} /> : <Head />}
      {status === STATUS.SUCCESS && (
        <>
          <OrgDetail
            org={org}
            galleries={GALLERIES?.galleries}
            status_galleries={GALLERIES.status}
          />
          <Container>
            <OrgContainer org={org} tab={tab} />
          </Container>
        </>
      )}
      <Footer />
    </div>
  );
}

export default MerchantDetail;
