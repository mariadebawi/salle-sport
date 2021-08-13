
 export interface GymModel {
        id: number ;
        description: string;
        name: string;
        logo?: string;
        code_fiscal: string;
        vacation_day: string;
        url_fcb: string;
        updated_at:Date;
        addressGym: null
    }


    export interface ManagerModel {
        id: number ;
        first_name : string;
        last_name: string;
        photo?: string;
        phone?: string;
        role:string;
        email: string;
        status: boolean;
        address: string;
        gym_id?: number,
        created_at:Date;
        updated_at:Date;
        gym?: GymModel
    }
  

