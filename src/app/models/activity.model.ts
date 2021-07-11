
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

