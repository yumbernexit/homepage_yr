import APP from "../context/App";
import { Buffer } from 'buffer'
import _ from 'lodash';
import { TMajeekoDomains, TMajeekoOrderDTO } from "../types/majeeko.type";

import qs from 'querystring'

export class MajeekoService  {

    public async getSuggestDomain(domain:string, lang:string): Promise<TMajeekoDomains[]>{
        try{
            
            let query = _.split(domain, '.', 2)
            const res = await fetch(
                APP.MAJEEKO_API_URL +`_/buy_yr/api/domain/suggest?q=${query[0]}&ext=.${query[1]}&lang=${lang}`, 
                {   method: 'GET',
                    cache: 'no-cache',
                    // headers: {
                    //     'Authorization': APP.getToken()
                    // }
                }
            )
            if(res.ok){
                let response: TMajeekoDomains[] = await res.json();
                return response;
            }else if(res.status===401){
                new Error('Unauthorized');
            }
        }catch(exception) {
            console.log('In getSuggestDomain() an exception happened: '+exception);
        }
        return [];
    }


    public async postOrderSubscription( body:Partial<TMajeekoOrderDTO>): Promise<any>{
        try{
         
            const res = await fetch(
                APP.MAJEEKO_API_URL +`_/buy_yr/api/order/subscription`, 
                {   method: 'POST',
                    cache:'no-cache', 
                    headers: {
                        //'Authorization': APP.getToken(),
                        //"Content-Type": "application/x-www-form-urlencoded"
                          "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)     
                 }
            )
            if(res.ok){
                let response: any = await res.json();
                return response;
            }else if(res.status===401){
                new Error('Unauthorized');
            }
        }catch(exception) {
            console.log('In postOrderSubscription() an exception happened: '+exception);
        }
        return [];
    }
}

