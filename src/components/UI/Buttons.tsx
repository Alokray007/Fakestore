import React from "react";
import BtnShopProps from "../../types/Buttons";

const BtnShop: React.FC<BtnShopProps> = ({ data }) => {
  return (
    <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
      {data}
    </button>
  );
};

const BtnHero: React.FC<BtnShopProps> = ({ data }) => {
  return (
    <button className="mt-2 bg-[#4C56D7] px-10 py-2 text-white sm:px-14 hover:bg-green-600">
      {data}
    </button>
  );
};

const BtnShopLeft: React.FC<BtnShopProps> = ({ data }) => {
  return (
    <a
      className="group relative inline-block overflow-hidden border border-indigo-600 px-8 py-3 focus:outline-none focus:ring"
      href="#"
    >
      <span className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"></span>

      <span className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white">
        {data}
      </span>
    </a>
  );
};

const BtnShopRight: React.FC<BtnShopProps> = ({ data }) => {
  return (
    <a
      className="group relative inline-block overflow-hidden border border-indigo-600 px-8 py-3 focus:outline-none focus:ring"
      href="#"
    >
      <span className="absolute inset-y-0 right-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"></span>

      <span className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white">
        {data}
      </span>
    </a>
  );
};

export { BtnShop, BtnHero, BtnShopLeft, BtnShopRight };
