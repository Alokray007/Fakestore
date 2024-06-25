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
    <button className="mt-2 bg-[#4C56D7] px-10 py-2 text-white sm:px-14">
      {data}
    </button>
  );
};

export { BtnShop, BtnHero };
