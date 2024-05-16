"use client";
import Skeleton from "@/app/component/Skeleton";
import { User } from "@/app/page";
import Link from "next/link";
import { useEffect, useState } from "react";

// async function getData(id: number): Promise<User> {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
//   if (!res.ok) {
//     throw new Error("Failed to fetch");
//   }
//   return res.json();
// }

function UserDetails({ params }: { params: { userId: number } }) {
  const id = params.userId;
  // const data = getData(id)
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) {
    return <Skeleton />;
  }

  if (!data) {
    return <p>User not found.</p>;
  }

  return (
    <div>
      <p>Name: {data.name}</p>
      <p>Username: {data.username}</p>
      <p>Email: {data.email}</p>
      <p>
        Address: {data.address.street} {data.address.suite} {data.address.city}
      </p>
      <p>Phone: {data.phone}</p>
      <p>Website: {data.website}</p>
      <p>
        Company: {data.company.name} - {data.company.catchPhrase} -{" "}
        {data.company.bs}
      </p>
      <Link href="/">Back to Home</Link>
    </div>
  );
}

export default UserDetails;
