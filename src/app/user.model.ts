export class User{
    constructor(
        public id:string,
        private token: string,
        private iat:string,
        public exp: string,
        public success: boolean
    ){}

    get _token(){
        if(!this.exp || !(new Date() > new Date(this.exp))){
            return null;
        }
        return this.token;
    }
}