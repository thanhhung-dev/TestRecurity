"use client";

import { useEffect, useState } from "react";
import { checkHealth } from "../services/api";

export function HealthCheck() {
    const [status, setStatus] = useState<"loading" | "success" | "error">(
        "loading"
    );

    useEffect(() => {
        checkHealth()
            .then(() => setStatus("success"))
            .catch(() => setStatus("error"));
    }, []);

    return (
        <div data-testid="health-status">
            Backend Status:
            {status === "loading" && "Loading..."}
            {status === "success" && "Connected"}
            {status === "error" && "Disconnected"}
        </div>
    );
}