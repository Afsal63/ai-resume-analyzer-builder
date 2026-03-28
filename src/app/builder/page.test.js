import { render, screen, fireEvent } from "@testing-library/react";
import BuilderPage from "./page";

// Mock child components
jest.mock("@/components/builder/ResumeForm", () => ({
  ResumeForm: ({ data }) => (
    <div>ResumeForm - {data.personalInfo.fullName}</div>
  ),
}));

jest.mock("@/components/builder/ResumePreview", () => ({
  ResumePreview: ({ data }) => (
    <div>ResumePreview - {data.personalInfo.fullName}</div>
  ),
}));

// Mock react-to-print
const mockPrint = jest.fn();

jest.mock("react-to-print", () => ({
  useReactToPrint: () => mockPrint,
}));

describe("Builder Page", () => {
  beforeEach(() => {
    mockPrint.mockClear();
  });

  test("renders ResumeForm and ResumePreview with data", () => {
    render(<BuilderPage />);

    expect(screen.getByText(/ResumeForm - John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/ResumePreview - John Doe/i)).toBeInTheDocument();
  });

  test("calls print function when clicking Download PDF", () => {
    render(<BuilderPage />);

    const button = screen.getByRole("button", {
      name: /download pdf/i,
    });

    fireEvent.click(button);

    expect(mockPrint).toHaveBeenCalledTimes(1);
  });
});