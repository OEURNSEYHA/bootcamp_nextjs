
import Card from "./component/Card";

// Define the types for the data structure
export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

// server fetching  data from the API
async function fetchUsers(): Promise<User[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return res.json();
}

// Server component to render the homepage
export default async function Home() {
  const data = await fetchUsers();

  return (
    <main className="w-[800px] m-auto mt-5">
      <Card initialData={data} />
    </main>
  );
}
