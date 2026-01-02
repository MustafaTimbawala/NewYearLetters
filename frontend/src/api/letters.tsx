import { BACKEND_URL } from "./utils";

export interface Letter {
  recipient: string;
  content: string;
  pics: string[];
}

export async function accessLetter( 
  recipient: string,
  password: string
): Promise<Letter> { 
  const url: string =  BACKEND_URL+"api/message"   
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ recipient, password }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Access denied");
  }
  
  return res.json();
}
