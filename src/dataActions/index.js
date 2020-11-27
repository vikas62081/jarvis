import { customers } from "./constant"

export const getCustomers=()=>{
        return customers
}

export const getCustomerById=(id)=>{
    const customerId=Number(id)
    return customers.find(cust=>cust.customerId===customerId)
}