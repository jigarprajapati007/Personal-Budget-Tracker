export default interface User{
    income:string;
    expense:string;
    description:string;
    category:string;
    id:string;
    date:string;
}
export default interface UserEntireObj{
    setEmptyToUserData:()=>{};
    userData:User
}