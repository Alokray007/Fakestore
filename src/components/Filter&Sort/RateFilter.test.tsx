import { render, screen } from "@testing-library/react";
import RateFilter from "./RateFilter";
import {RateFilterProps} from "../../types/Products"

const mockHandleResetRating = jest.fn();
const mockHandleRatingChange = jest.fn();
const selectedRatings = { fourStar: true,  threeStar: true, twoStar: false, oneStar: false }

const renderComponent = () => {
    const props : RateFilterProps = {handleResetRating : mockHandleResetRating , handleRatingChange : mockHandleRatingChange, selectedRatings: selectedRatings}
    render(<RateFilter {...props} />)
}

describe('RateFilter Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        renderComponent();
    });

    test('renders all components correctly', () => {
        expect(screen.getByText("Rating")).toBeInTheDocument();
        expect(screen.getByText(/Selected/i)).toBeInTheDocument();
        expect(screen.getByRole("button", {name: /Reset/i})).toBeInTheDocument();
        const allRatings = screen.getAllByRole("checkbox");
        allRatings.forEach(rating => {
            expect(rating).toBeInTheDocument();
        })
    });

});
