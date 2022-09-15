export interface IBranch {
  address: string;
  created_at: string;
  district: string | null;
  district_code: string | null;
  full_address: string;
  id: number;
  image: string | null;
  image_url: string;
  latitude: number | string | null;
  longitude: number | string | null;
  name: string;
  organization_id: number;
  origin_id: number;
  province: number | string | null;
  province_code: number | string | null;
  telephone: string;
  ward: string | null;
  ward_code: string | null;
}
