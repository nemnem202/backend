export type Account = {
    id:number;
    username:string;
    password:string;
    number_of_reports:number;
    suspended?:boolean;
    is_vendor?:boolean;
    is_modo?:boolean;
}

export type AdminAccount = {
    id:number;
    username:string;
    password:string;
}