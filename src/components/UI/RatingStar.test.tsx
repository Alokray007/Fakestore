import { render } from "@testing-library/react";
import RatingStars from "./RatingStar";
import { RatingStarsProps } from '../../types/Products';


describe('RatingStar component', () => {
    const renderComponent = (rating: number) => {
        const props : RatingStarsProps = {rating};
        render(<RatingStars {...props} />);
    }

    test('renders the correct number of stars', () => {
        renderComponent(0);
        const stars = document.querySelectorAll('svg');
        expect(stars.length).toBe(5);
    });

    test('fills the correct number of stars based on rating', () => {
        renderComponent(3);
        const stars = document.querySelectorAll('svg');
        stars.forEach((star, index) => {
            if(index < 3) {
                expect(star).toHaveAttribute('fill', 'currentColor')
            } else {
                expect(star).toHaveAttribute('fill', 'none')
            }
        });
    });

    test('rounds the rating to the nearest whole number', () => {
        renderComponent(2.6);
        const stars = document.querySelectorAll('svg');
        stars.forEach((star, index) => {
            if(index < 3) {
                expect(star).toHaveAttribute('fill', 'currentColor')
            } else {
                expect(star).toHaveAttribute('fill', 'none')
            }
        });
    });

})
