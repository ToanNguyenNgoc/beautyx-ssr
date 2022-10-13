import React from "react";
import Bottom from "../Bottom/index";
import Head from "../../features/Head";
import Footer from "../../features/Footer";
import { ApointmentTab } from "../../pages/Apointment";

function Calendar(props: any) {
  return (
    <>
      <div className="calender-wrap">
        <Head />
      </div>
      <div>
        <ApointmentTab />
      </div>
      <Bottom />
      <div className="calender-wrap">
        <Footer />
      </div>

    </>
  );
}

export default Calendar;
