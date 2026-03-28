import { render, screen, fireEvent } from '@testing-library/react';
import Home from '@/app/page';
import '@testing-library/jest-dom';

// Mock next/navigation
const pushMock = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe('Home Page', () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  test('renders hero section', () => { 
render (<Home/>);
  expect(screen.getByText( /Craft the perfect resume/i )).toBeInTheDocument()
   expect(screen.getByText( /Powered by Advanced AI/i )).toBeInTheDocument()
   })

  test('renders feature cards', () => {
    render(<Home />);

    expect(screen.getByText(/Smart Analysis/i)).toBeInTheDocument();
    expect(screen.getByText(/AI Enhancement/i)).toBeInTheDocument();
    expect(screen.getByText(/Dynamic Builder/i)).toBeInTheDocument();
  });

test('renders pricing section', () => {
  render(<Home />);

  expect(screen.getByText(/Hobby/i)).toBeInTheDocument();

  const proElements = screen.getAllByText(/Pro/i);
  expect(proElements.length).toBeGreaterThan(0);
});

  test('navigates to builder page on Build Resume click', () => {
    render(<Home />);

    const button = screen.getByRole('button', { name: /build resume/i });
    fireEvent.click(button);

    expect(pushMock).toHaveBeenCalledWith('/builder');
  });

  test('navigates to analyzer page on Analyze Existing click', () => {
    render(<Home />);

    const button = screen.getByRole('button', { name: /analyze existing/i });
    fireEvent.click(button);

    expect(pushMock).toHaveBeenCalledWith('/analyzer');
  });

  test('Start Free button navigates to builder', () => {
    render(<Home />);

    const button = screen.getByRole('button', { name: /start free/i });
    fireEvent.click(button);

    expect(pushMock).toHaveBeenCalledWith('/builder');
  });

  test('Upgrade to Pro shows alert', () => {
    render(<Home />);

    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    const button = screen.getByRole('button', { name: /upgrade to pro/i });
    fireEvent.click(button);

    expect(alertMock).toHaveBeenCalledWith(
      'Please sign up and upgrade in the top menu!'
    );

    alertMock.mockRestore();
  });
});