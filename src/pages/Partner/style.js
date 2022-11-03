import { makeStyles } from "@mui/styles";
export const partnerStyle = makeStyles((theme) => ({
  container: {
    height: "100%",
    margin: "0 auto",
    maxWidth: "1232px",
  },
  errtext: {
    marginLeft: "20px",
    fontSize: "12px",
    fontWeight: 700,
    color: "var(--red-cl)",
    width: "100%",
    fontStyle: "italic",
  },
  partner: {
    padding: "64px 15px 64px 15px",
    backgroundColor: "var(--bg-gray)",
    "@media (max-width: 767px)": {
      maxWidth: "100%",
      padding: "32px 15px 64px 15px",
    },
  },
  content: {
    display: "flex",
    justifyContent: "center",
    gap: "0 44px",
    "@media (max-width: 767px), (max-width: 1024px)": {
      flexDirection: "column",
      padding: "0 16px 0 16px",
      alignItems: "center",
      gap: "24px 0",
    },
    "@media (max-width: 767px)": {
      gap: "unset",
    },
  },
  partnerInfor: {
    maxWidth: "670px",
    "@media (max-width: 767px), (max-width: 1024px)": {
      flexDirection: "column",
      maxWidth: "100%",
    },
  },
  partnerTitle: {
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "32px",
    lineHeight: "36px",
    textAlign: "center",
    color: "var( --purple)",
    paddingBottom: "24px",
    whiteSpace: "normal",
  },
  parnerImg: {
    margin: "0 auto",
    maxWidth: "480px",
    height: "360px",
    "& img": {
      height: "100%",
      objectFit: "cover",
    },
  },
  partnerDesc: {
    paddingTop: "24px",
    fontStyle: "normal",
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: 500,
    color: "var(--text-black)",
  },
  partnerList: {
    paddingTop: "24px",
    gap: "0  36px",
    display: "flex",
    flexDirection: "column",
  },
  partnerItem: {
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "14px",
    lineHeight: "20px",
    color: "var(--text-black)",
    gridTemplateColumns: "repeat(2, 1fr)",
    display: "grid",
    gap: "0 36px",
    marginBottom: "16px",
    "@media all and (max-width: 767px)": {
      gridTemplateColumns: "1fr",
      gap: "16px 0",
    },
  },
  partnerRegis: {
    maxWidth: "calc( 100% - 670px )",
    boxShadow: "0px 6px 15px #DCD8EE",
    borderRadius: "24px",
    height: "max-content",
    "@media (max-width: 767px), (max-width: 1024px)": {
      maxWidth: "100%",
    },
    "@media (max-width: 767px)": {
      boxShadow: "unset",
    },
  },
  partnerRegisTitle: {
    fontFamily: "Quicksand",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "24px",
    lineHeight: "28px",
    maxWidth: "432px",
    textAlign: "center",
    color: "var(--purple)",
    margin: "36px 27px 32px 36px",
  },
  form: {
    padding: "0 36px",
    "@media (max-width: 767px)": {
      padding: "unset",
    },
  },
  wrapInput: {
    position: "relative",
    boxShadow: "inset 0px 2px 6px rgba(113, 97, 186, 0.2)",
    borderRadius: "18px",
    overflow: "hidden",
    width: "100%",
    "&:nth-child(6)": {
      marginBottom: "0",
    },
  },
  inputName: {
    width: "calc(100% - 64px)",
    padding: "8px",
    border: "0",
    margin: "0 36px 0 36px",
    backgroundColor: "transparent",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "14px",
    lineHheight: "20px",
    color: "var(--purple)",
    "&::placeholder": {
      color: "#A2A1AB",
    },
  },
  inputImgName: {
    width: "20px",
    height: "20px",
    position: "absolute",
    left: "16px",
    top: "50%",
    transform: "translateY(-50%)",
  },
  checkbox: {
    display: "flex",
    alignItems: "center",
    margin: "12px 0 0 -12px",
    "& span": {
      display: "flex",
    },
    "@media (max-width: 767px)": {
      margin: "6px 0 0 -12px",
    },
  },
  checkboxText: {
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "11px",
    lineHheight: "12px",
  },
  btnWrap: {
    display: "flex",
    justifyContent: "center",
    padding: "14px 0 36px 0",
  },
}));
