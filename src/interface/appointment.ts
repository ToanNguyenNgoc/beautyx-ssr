import { IOrganization } from "./organization";
import { IBranch } from "./branch";
import { Service } from "./service"

export interface Appointment {
  date: string;
  branch_id: null;
  branch?: IBranch;
  created_at: string;
  deleted_at: null;
  id: number;
  note: string;
  order_id: number | null;
  organization_id: number;
  organization: IOrganization;
  origin_id: number;
  origin_type: string;
  status: string;
  time_end: string;
  time_start: string;
  updated_at: string;
  user_id: number;
  services: Service[];
  qr_link: string
}
export interface AppointmentTime extends Appointment {
  short_time: string,
  short_month_year: string,
  start_at: number
}
export interface NewAppointments {
  apps: AppointmentTime[],
  date_start: string,
  year_month: string,
  month_day: string
}
//
export interface AppointmentNoti extends Appointment {
  viewed: boolean
}
