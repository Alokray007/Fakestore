import { render, screen } from "@testing-library/react"
import SocialSvg from "./SocialSvg";

describe('SocialSvg Component', () => {
    test('renders all social media links with correct href attributes', () => {
        render (<SocialSvg />)
        const facebookLink = screen.getByLabelText(/facebook/i);
        expect(facebookLink).toBeInTheDocument();
        expect(facebookLink).toHaveAttribute('href', 'https://www.facebook.com/');

        const twitterLink = screen.getByLabelText(/twitter/i);
        expect(twitterLink).toBeInTheDocument();
        expect(twitterLink).toHaveAttribute('href', 'https://x.com/');

        const instagramLink = screen.getByLabelText(/instagram/i);
        expect(instagramLink).toBeInTheDocument();
        expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com/');

        const linkedinLink = screen.getByLabelText(/linkedin/i);
        expect(linkedinLink).toBeInTheDocument();
        expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/');
    });

})
