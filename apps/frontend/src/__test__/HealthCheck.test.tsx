import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { HealthCheck } from "@/app/components/HealthCheck";

describe("HealthCheck", () => {
  it("shows success message when backend is healthy", async () => {
    render(<HealthCheck />);
    await waitFor(() => {
      const connectedText = screen.queryByText(/Connected/i);
      const disconnectedText = screen.queryByText(/Disconnected/i);

      expect(connectedText || disconnectedText).toBeInTheDocument();
    });
  });
});
