export type TFormMajeekoType = 'customer'|'business';

export type TMajeekoDomains = {
    availability: "UNAVAILABLE" | 'AVAILABLE'
    domainName:  string;
    mld : string;
    tld: string;
}

export type TMajeekoCartItemDefinition = {
    type:"service"|"module"|"domain";
    value:string;
    price:number;
    id?:string;
}

export type TMajeekoStripeCartItemDTO = {
    id:string;
    product:string;
    quantity:number;
    name: string;
    selected: boolean;
    price:number;
    type: "service" |"module" |"domain"
}

export type TMajeekoStripeDataDTO = {
    customer:string;
    subscriptions:string[];
    inovices:string[]
}

export type TMajeekoStripeDTO = {
    cart:TMajeekoStripeCartItemDTO[];
    data:TMajeekoStripeDataDTO;
}


export type TMAjeekoInfoDTO = {
    first_name?:string |null;
	last_name?:string |null;
	email?:string |null;
	phone?:string |null;
	address?:string |null;
    city?:string |null;
	province?:string |null;
	ssn?:string |null;
    sdi?:string |null;
	zip?:string |null;
    vat?:string |null;
	country?:string |null;
	business_name?:string |null;
    pec?:string |null;
}

export type TMajeekoOrderDTO = {
    _id?:string;
    user_id?:string |null; 
    user_mongo_id?: string| null;
    page_id?:string | null;
    preview_id?:string | null;
    facebook_page_id?:string | null;
    affiliate?:string | null;
    subscription?:string | null;
    agent?:string | null;
    reseller?:string | null;
    invoice?:string | null;
    type?:string | null;
    billing_info:TMAjeekoInfoDTO | null;
    domain_info?:TMAjeekoInfoDTO | null;
    status?:string | null;
    domain_to_transfer?:string | null;
    auth_code?:string | null;
    date?:string | null;
    insert_date?:string | null;
    language?:string | null;
    notes?:string | null;
    total?:number;
    cart?: TMajeekoCartItemDefinition[]
    domains?:string[]
    stripe?: TMajeekoStripeDTO;
    payment_info?:null;
}