export interface OffersModel {
    id: number;
    name: string;
    description: string;
    duration: string;
    price: number;
    activity_id: number;
    number_of_sessions: number;
    created_at: Date;
    unit: string;
    activity: ActivityModel;
}

export interface Coach {
  id: number;
  first_name: string;
  last_name: string;
  photo?: any;
  phone?: any;
  role: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export interface ActivityModel {
  id: number;
  coach_id: number;
  name: string;
  description: string;
  created_at: Date;
  coach: Coach;
}
