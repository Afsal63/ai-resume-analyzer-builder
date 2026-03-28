import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AnalyzerPage from "./page";

// ✅ Mock UploadArea
const mockUpload = jest.fn();

jest.mock("@/components/analyzer/UploadArea", () => ({
  UploadArea: ({ onFileProcessed, isLoading }) => {
    mockUpload.mockImplementation(onFileProcessed);

    return (
      <div>
        UploadArea
        <button onClick={() => onFileProcessed(new FormData())}>
          Upload File
        </button>
        {isLoading && <span>Loading...</span>}
      </div>
    );
  },
}));

// ✅ Mock Results
jest.mock("@/components/analyzer/Results", () => ({
  Results: ({ data, onReset }) => (
    <div>
      Results - {data?.score}
      <button onClick={onReset}>Reset</button>
      <p> {data?.summary}</p>
    </div>
  ),
}));

// ✅ Mock useCredits hook
const mockDeductCredit = jest.fn();

jest.mock("@/hooks/useCredits", () => ({
  useCredits: () => ({
    deductCredit: mockDeductCredit,
  }),
}));

describe("Analyzer Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders UploadArea initially", () => {
    render(<AnalyzerPage />);

    expect(screen.getByText(/UploadArea/i)).toBeInTheDocument();
  });

  test("shows alert if no credits", () => {
    mockDeductCredit.mockReturnValue(false);

    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    render(<AnalyzerPage />);

    fireEvent.click(screen.getByText(/Upload File/i));

    expect(alertMock).toHaveBeenCalledWith(
      "You are out of AI Tokens! Please upgrade to Pro in the top menu.",
    );

    alertMock.mockRestore();
  });

  test("calls API and shows results on success", async () => {
    mockDeductCredit.mockReturnValue(true);

    // ✅ Mock fetch success
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ score: 85 }),
      }),
    );

    render(<AnalyzerPage />);

    fireEvent.click(screen.getByText(/Upload File/i));

    // wait for results to appear
    await waitFor(() => {
      expect(screen.getByText(/Results - 85/i)).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledWith("/api/analyze", expect.any(Object));
  });

  test("handles API failure", async () => {
    mockDeductCredit.mockReturnValue(true);

    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      }),
    );

    render(<AnalyzerPage />);

    fireEvent.click(screen.getByText(/Upload File/i));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalled();
    });

    alertMock.mockRestore();
  });

  test("reset button brings back UploadArea", async () => {
    mockDeductCredit.mockReturnValue(true);

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ score: 90 }),
      }),
    );

    render(<AnalyzerPage />);

    fireEvent.click(screen.getByText(/Upload File/i));

    await waitFor(() => {
      expect(screen.getByText(/Results - 90/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/Reset/i));

    expect(screen.getByText(/UploadArea/i)).toBeInTheDocument();
  });
});
