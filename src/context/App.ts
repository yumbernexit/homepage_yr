import {Buffer} from 'buffer';


class APP{

    public static API_URL: string | undefined = process.env.REACT_APP_SERVER_URL;
    public static MAJEEKO_API_URL: string | undefined = process.env.REACT_APP_MAJEEKO_SVC; 
    public static MAJEEKO_API_USERNAME: string | undefined = process.env.REACT_APP_MAJEEKO_BASIC_AUTH_USER; 
    public static MAJEEKO_API_PASSWORD: string | undefined = process.env.REACT_APP_MAJEEKO_BASIC_AUTH_PASSWORD; 

    public static getToken(){
        let token = 'Basic '+Buffer.from(this.MAJEEKO_API_USERNAME + ":" + this.MAJEEKO_API_PASSWORD).toString("base64")
        return token;
    }

    // public static getToken = () => {
    //     const accessToken = sessionStorage.getItem(ATP.SESSION_TOKEN);
      
    //     if (accessToken) {
    //       return  accessToken ;
    //     } else {
    //       return '';
    //     }
    //   }

    // public static getAuthHeader = () => {
    //   return 'Bearer '+this.getToken();
    // }
 
}

export default APP;