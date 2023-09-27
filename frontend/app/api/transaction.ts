import { cookies } from "next/dist/client/components/headers";
import { api } from ".";
import { ResponseDTO } from "../models/response";
import { TransactionType } from "../models/transaction";


async function getCookie(name: string) {
    return cookies().get(name)?.value ?? '';
}

export async function createTransaction(transaction: TransactionType): Promise<void> {
    
    const token = await getCookie('token');

    const res = await fetch("http://localhost:8080/transaction", {
        method: "POST",
        credentials: "include",
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
          "Cookie": `token=${token}`
        },
        body: JSON.stringify(transaction)
    });


    const response: ResponseDTO = await res.json();

    if (!response.success) {
        throw new Error(response.message);
    }
}

export async function loadTransactions(): Promise<TransactionType[]> {
     
    const token = await getCookie('token');

    const res = await fetch("http://localhost:8080/transaction", {
        method: "GET",
        credentials: "include",
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
          "Cookie": `token=${token}`
        }
    });

    const response: ResponseDTO = await res.json();

    if (!response.success) {
        throw new Error(response.message);
    }

    const transactions: TransactionType[] = response.data;
    return transactions;
}

export async function removeTransaction(id: number): Promise<void> {

    const token = await getCookie('token');

    const res = await fetch(`http://localhost:8080/transaction/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
          "Cookie": `token=${token}`
        }
    }); 
    
    const response = await res.json();

    if (!response.success) {
        throw new Error(response.message);
    }

}