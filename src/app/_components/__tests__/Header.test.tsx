import { render } from '@testing-library/react';
import Header from '../Header';
import '@testing-library/jest-dom';

// Mock the AvatarAndMenu component
jest.mock('../AvatarAndMenu', () => () => <div>Mocked AvatarAndMenu</div>);

describe('Header Component', () => {
    it('renders correctly and matches snapshot', () => {
        const { asFragment } = render(<Header />);
        expect(asFragment()).toMatchSnapshot();
    });
});
