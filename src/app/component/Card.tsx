// components/ClientSideComponent
"use client"; // Required for client-side components

import { useState } from "react";
import Link from "next/link";
import { User } from "../page";
import Skeleton from "./Skeleton"; // Adjust the path if needed

const ClientSideComponent = ({ initialData }: { initialData: User[] }) => {
  const [visibleData, setVisibleData] = useState<User[]>(
    initialData.slice(0, 5)
  );
  const [visibleCount, setVisibleCount] = useState(5);

  const handleSeeMore = () => {
    const newCount = visibleCount + 5;
    setVisibleCount(newCount);
    setVisibleData(initialData.slice(0, newCount));
  };

  return (
    <>
      {visibleData.length === 0 ? (
        <Skeleton />
      ) : (
        visibleData.map((item) => (
          <Link
            href={`details/${item.id}`}
            key={item.id}
            className="grid grid-cols-1 w-full"
          >
            <div className="mb-5 w-full">
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
      {visibleData.length < initialData.length && (
        <button
          onClick={handleSeeMore}
          className="mt-5 p-2 bg-blue-500 text-white rounded"
        >
          See More
        </button>
      )}
    </>
  );
};

export default ClientSideComponent;
