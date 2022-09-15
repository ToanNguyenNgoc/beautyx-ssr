export interface Appointment {
  date: string;
  branch_id: null;
  created_at: String;
  deleted_at: null;
  id: number;
  note: string;
  order_id: number | null;
  organization_id: number;
  origin_id: number;
  origin_type: string;
  status: string;
  time_end: string;
  time_start: string;
  updated_at: string;
  user_id: number;
  services:any[]
}

