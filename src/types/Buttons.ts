import { Pdct } from "./Products";

interface BtnShopProps {
    data: string;
    handleCart: (product: Pdct, redirect: boolean) => void;
    product: Pdct;
    redirect?: boolean;
  }

export default BtnShopProps;
