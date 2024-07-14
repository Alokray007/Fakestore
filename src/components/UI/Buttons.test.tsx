import { render, screen } from "@testing-library/react";
import { BtnShop} from "./Buttons";
import { Pdct } from "../../types/Products";


const mockHandleCart = jest.fn();
const mockProduct: Pdct = {
    id: 1,
    title: 'Test Product',
    price: 100,
    category: 'Test Category',
    description: 'Test Description',
    image: 'test-image-url',
    rating: {
      rate: 4.5,
      count: 10,
    }
};
const mockData = "Buy Now";
const mockBool = true;

describe("Button Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('BtnShop renders with correct text and calls handleCart on click', () => {
        render(<BtnShop handleCart={mockHandleCart} product={mockProduct} data={mockData} bool={mockBool}/>)
        expect(screen.getByText(mockData)).toBeInTheDocument();

    })

});
