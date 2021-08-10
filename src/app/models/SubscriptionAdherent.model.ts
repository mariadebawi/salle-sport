import { ManagerModel } from "./gym.model";
import { OffersModel } from "./offers.model";
    export interface SubscriptionAdherent {
        id: number;
        type_subscriptions_id: number;
        start_at: string;
        end_at: string;
        status: number;
        created_at: Date;
        adherent_id: number;
        types_subscription: OffersModel;
        adherent: ManagerModel;
    }
