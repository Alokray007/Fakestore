import { render, screen } from "@testing-library/react";
import RateFilter from "./RateFilter";
import { RateFilterProps } from "../../types/Products";
import userEvent from "@testing-library/user-event";

const mockHandleResetRating = jest.fn();
const mockHandleRatingChange = jest.fn();

const defaultProps: RateFilterProps = {
  selectedRatings: {
    fourStar: false,
    threeStar: false,
    twoStar: false,
    oneStar: false,
  },
  handleResetRating: mockHandleResetRating,
  handleRatingChange: mockHandleRatingChange,
};

const renderComponent = (props = defaultProps) => {
  render(<RateFilter {...props} />);
};

describe("RateFilter Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders all components correctly", () => {
    renderComponent();

    expect(screen.getByText("Rating")).toBeInTheDocument();
    expect(screen.getByText(/Selected/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Reset/i })).toBeInTheDocument();
    const allRatings = screen.getAllByRole("checkbox");
    allRatings.forEach((rating) => {
      expect(rating).toBeInTheDocument();
    });
  });

  test("calls handleResetRating when reset button is clicked", async () => {
    renderComponent();

    const resetButton = screen.getByRole("button", { name: /Reset/i });

    const user = userEvent.setup();
    await user.click(resetButton);

    expect(mockHandleResetRating).toHaveBeenCalled();
  });

  test("displays the correct number of selected ratings", async () => {
    const props = {
        ...defaultProps,
        selectedRatings: {
          fourStar: true,
          threeStar: true,
          twoStar: false,
          oneStar: false,
        },
      };
    renderComponent(props);

    expect(screen.getByText(/Selected/i)).toHaveTextContent("2 Selected");
  });
  
});
