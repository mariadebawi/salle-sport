import { GymModel } from "./gym.model";
import { OffersModel } from "./offers.model";
 export  interface  subscriptionGym{
        id: number;
        gym_id: number;
        offer_id: number;
        start_at: string;
        end_at: string;
        payment_receipt: string;
        status: number;
        created_at: Date;
        offer: OffersModel;
        gym: GymModel;
    }
