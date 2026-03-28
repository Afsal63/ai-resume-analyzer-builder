import { render, screen, fireEvent } from "@testing-library/react";
import { Results } from "@/components/analyzer/Results";

jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children }) => <div>{children}</div>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
  },
}));

jest.mock("lucide-react", () => ({
  CheckCircle: () => <div />,
  XCircle: () => <div />,
  ArrowRight: () => <div />,
  RefreshCw: () => <div />,
}));

const mockData = {
  score: 85,
  summary: "Strong profile",
  strengths: ["React"],
  weaknesses: ["Testing"],
  suggestions: ["Add projects"],
};

describe("Results Component", () => {
  test("renders nothing when no data is provided", () => {
    const { container } = render(<Results />);
    expect(container.firstChild).toBeNull();
  });

  test("renders header and button when data is provided", () => {
    render(<Results data={mockData} onReset={jest.fn()} />);

    expect(screen.getByText("Analysis Complete")).toBeInTheDocument();
    expect(screen.getByText("Analyze Another")).toBeInTheDocument();
  });

  test("renders score correctly", () => {
    render(<Results data={mockData} onReset={jest.fn()} />);

    expect(screen.getByText("85")).toBeInTheDocument();
    expect(screen.getByText("/100")).toBeInTheDocument();
  });

  test("shows correct message for high score", () => {
    render(<Results data={{ ...mockData, score: 85 }} onReset={jest.fn()} />);

    expect(screen.getByText("Great Resume!")).toBeInTheDocument();
  });

  test("calls onReset when button is clicked", () => {
    const mockFn = jest.fn();

    render(<Results data={mockData} onReset={mockFn} />);

    fireEvent.click(screen.getByText("Analyze Another"));

    expect(mockFn).toHaveBeenCalled();
  });
});
