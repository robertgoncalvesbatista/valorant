"use client";

import Image from "next/image";

import { Map } from "@/domain/map";

type Props = {
  map: Map | undefined;
};

export default function SelectedMap({ map }: Readonly<Props>) {
  if (!map) {
    return (
      <div className="shadow rounded-md w-[220px] h-[100px] mb-4 md:w-[420px] md:h-[236px]">
        <div className="flex-1 animate-pulse">
          <div className="h-[236px] bg-slate-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4 w-full h-full sm:w-[420px] sm:h-[236px]">
      <Image
        priority
        src={map.splash}
        alt={map.displayName}
        width={500}
        height={500}
        className="brightness-50"
        style={{ border: "2px solid #ff4654" }}
      />

      <h1 className="relative bottom-16 left-4 text-2xl uppercase">
        {map.displayName}
      </h1>
    </div>
  );
}
