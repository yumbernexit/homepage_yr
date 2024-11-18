export type TStripeResponseData<T> = {
    data: Array<T>,
    has_more:boolean;
    object: 'list',
    url: string;
}

export type TStripeProductMetadata = {
    type: 'plan'|'service'|'domain'| null; 
    version_site: '1.1' | '1.2'| null;
}


export type TStripeProductDTO = {
    id: string; // 'prod_QK1W0YGfUgoYYE',
    object: 'product'; 
    active: boolean;
    attributes: Array<any>;
    metadata:TStripeProductMetadata | null;
    name: string;
}


export type TStripePricesDTO = {
    active: boolean;
    billing_scheme:string;//"per_unit"
    created: number; //1718799527
    currency: string; //"eur"
    custom_unit_amount: null 
    id: string; //"price_1PTNTPDw8D2tSnuyOPbWfp2m"
    livemode: boolean
    lookup_key : string; // "pro-144cd8b"
    metadata: any
    nickname :string| null
    object: "price"
    product:TStripeProductDTO;
    recurring:any;
    tax_behavior: string; 
    tiers_mode: null
    transform_quantity: null
    type: string; //"recurring"
    unit_amount: number;
    unit_amount_decimal: string;
}