export type CustomerOrder = {
    id:number;
    order_total_sum:number;
    order_date: Date;
    is_current:boolean;
    account_id:number;
}