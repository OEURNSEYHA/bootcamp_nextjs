"use client";
import Link from "next/link";
import Skeleton from "./component/Skeleton";
import { useState, useEffect } from "react";
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

// Fetch data from the API
// async function getData(): Promise<User[]> {
//   const res = await fetch("https://jsonplaceholder.typicode.com/users", {
//     next: { revalidate: 10 },
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch");
//   }

//   return res.json();
// }

// Server component to render the homepage
export default function Home() {
  // const data = await getData();
  const [data, setData] = useState<User[]>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <main className="w-[800px] m-auto mt-5">
      {data.length == 0 ? (
        <Skeleton />
      ) : (
        data.map((item) => (
          <Link
            href={`details/${item.id}`}
            key={item.id}
            className=" grid grid-cols-1 w-full"
          >
            <div className="  mb-5 w-full">
              <div
                className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                title="Woman holding a mug"
              ></div>
              <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div className="mb-8">
                  <div className="text-gray-900 font-bold text-xl mb-2">
                    {item.username}
                  </div>
                  <p className="text-gray-700 text-base">{item.company.name}</p>
                </div>
                <div className="flex items-center">
                  {/* <img className="w-10 h-10 rounded-full mr-4" src="/img/jonathan.jpg" alt="Avatar of Jonathan Reinink"> */}
                  <div className="text-sm">
                    <p className="text-gray-900 leading-none">{item.name}</p>
                    <p className="text-gray-600">{item.address.street}</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))
      )}
    </main>
  );
}
