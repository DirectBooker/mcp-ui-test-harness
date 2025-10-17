"use client";

import { useState, useRef, useEffect } from "react";
import { MIDDLE_EARTH_HOTELS } from "@/data/hotels";

const SET_GLOBALS_EVENT_TYPE = "openai:set_globals" as const;

export default function Home() {
  const [mcpServerUrl, setMcpServerUrl] = useState("http://localhost:3000/mcp");
  const [isLoading, setIsLoading] = useState(false);
  const [carouselData, setCarouselData] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [loadingTime, setLoadingTime] = useState(0);
  const [error, setError] = useState("");
  const [iframeReady, setIframeReady] = useState(false);
  const [pendingGlobals, setPendingGlobals] = useState<Record<
    string,
    unknown
  > | null>(null);
  const [resources, setResources] = useState<
    Array<{ name: string; uri: string }>
  >([]);
  const [selectedResourceName, setSelectedResourceName] = useState<string>("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Set up message listener for iframe ready signals
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "iframe:ready") {
        setIframeReady(true);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Send pending globals when iframe becomes ready
  useEffect(() => {
    if (iframeReady && pendingGlobals) {
      const iframe = iframeRef.current;
      if (iframe && iframe.contentWindow) {
        try {
          iframe.contentWindow.postMessage(
            {
              type: SET_GLOBALS_EVENT_TYPE,
              globals: pendingGlobals,
            },
            "*"
          );
          setPendingGlobals(null);
        } catch (error) {
          console.error("Failed to send pending globals:", error);
        }
      }
    }
  }, [iframeReady, pendingGlobals]);

  // Function to set globals and send to iframe via postMessage
  const setIframeGlobals = (globals: Record<string, unknown>) => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) {
      return;
    }

    // If iframe isn't ready yet, store globals for later
    if (!iframeReady) {
      setPendingGlobals(globals);
      return;
    }

    try {
      // Use postMessage to send data to iframe safely
      iframe.contentWindow.postMessage(
        {
          type: SET_GLOBALS_EVENT_TYPE,
          globals,
        },
        "*"
      );
    } catch (error) {
      console.error("Failed to send globals to iframe:", error);
    }
  };

  // Function to update iframe content
  const updateIframeContent = (content: string) => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) {
      return;
    }

    try {
      iframe.contentWindow.postMessage(
        {
          type: "update_content",
          content,
        },
        "*"
      );
    } catch (error) {
      console.error("Failed to update iframe content:", error);
    }
  };

  const listResources = async () => {
    if (!mcpServerUrl) {
      setError("Please enter a MCP server URL");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Initialize MCP connection
      const initResponse = await fetch(mcpServerUrl, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/event-stream",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "initialize",
          params: {
            protocolVersion: "2024-11-05",
            capabilities: {
              resources: {},
            },
            clientInfo: {
              name: "mcp-harness-client",
              version: "1.0.0",
            },
          },
          id: 1,
        }),
      });

      if (!initResponse.ok) {
        throw new Error(
          `Initialize failed: ${initResponse.status} ${initResponse.statusText}`
        );
      }

      const initResult = await initResponse.json();
      if (initResult.error) {
        throw new Error(`Initialize error: ${initResult.error.message}`);
      }

      // List available resources
      const resourcesResponse = await fetch(mcpServerUrl, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/event-stream",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "resources/list",
          params: {},
          id: 2,
        }),
      });

      if (!resourcesResponse.ok) {
        throw new Error(
          `Resources list failed: ${resourcesResponse.status} ${resourcesResponse.statusText}`
        );
      }

      const resourcesResult = await resourcesResponse.json();
      if (resourcesResult.error) {
        throw new Error(
          `Resources list error: ${resourcesResult.error.message}`
        );
      }

      const listed = resourcesResult.result?.resources || [];
      if (!Array.isArray(listed) || listed.length === 0) {
        throw new Error("No resources returned by the MCP server");
      }

      setResources(listed);

      // Default selection: prefer "Carousel" if present, else first item
      const defaultSel =
        listed.find((r: { name: string }) => r.name === "Carousel")?.name ||
        listed[0].name;
      setSelectedResourceName(defaultSel);
    } catch (err) {
      console.error("MCP Error:", err);
      setError(
        `Failed to list resources: ${err instanceof Error ? err.message : "Unknown error"}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const querySelectedResource = async () => {
    if (!mcpServerUrl) {
      setError("Please enter a MCP server URL");
      return;
    }
    if (!selectedResourceName) {
      setError("Please select a resource (list resources first)");
      return;
    }

    const selected = resources.find(r => r.name === selectedResourceName);
    if (!selected) {
      setError("Selected resource not found. Please list resources again.");
      return;
    }

    setIsLoading(true);
    setError("");
    const startTime = Date.now();

    try {
      // Initialize MCP connection (fresh session for robustness)
      const initResponse = await fetch(mcpServerUrl, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/event-stream",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "initialize",
          params: {
            protocolVersion: "2024-11-05",
            capabilities: {
              resources: {},
            },
            clientInfo: {
              name: "mcp-harness-client",
              version: "1.0.0",
            },
          },
          id: 1,
        }),
      });

      if (!initResponse.ok) {
        throw new Error(
          `Initialize failed: ${initResponse.status} ${initResponse.statusText}`
        );
      }

      const initResult = await initResponse.json();
      if (initResult.error) {
        throw new Error(`Initialize error: ${initResult.error.message}`);
      }

      // Read the selected resource
      const readResponse = await fetch(mcpServerUrl, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/event-stream",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "resources/read",
          params: {
            uri: selected.uri,
          },
          id: 3,
        }),
      });

      if (!readResponse.ok) {
        throw new Error(
          `Resource read failed: ${readResponse.status} ${readResponse.statusText}`
        );
      }

      const readResult = await readResponse.json();
      if (readResult.error) {
        throw new Error(`Resource read error: ${readResult.error.message}`);
      }

      const endTime = Date.now();
      const loadTime = endTime - startTime;

      const contents = readResult.result?.contents || [];
      let dataText = "";
      let iframeBodyContent = "";

      if (contents.length > 0) {
        const content = contents[0];
        if (content.type === "text") {
          dataText = content.text || "";
        } else {
          dataText = JSON.stringify(content, null, 2);
        }
        iframeBodyContent = content.text || "No text content available";
      }

      setCarouselData(dataText);
      setCharacterCount(dataText.length);
      setLoadingTime(loadTime);

      updateIframeContent(iframeBodyContent);

      setIframeGlobals({
        toolOutput: {
          resourceContent: iframeBodyContent,
          hotels: MIDDLE_EARTH_HOTELS,
          metadata: {
            characterCount: dataText.length,
            loadingTime: loadTime,
            timestamp: new Date().toISOString(),
            resourceUri: selected.uri,
            resourceName: selected.name,
          },
        },
      });
    } catch (err) {
      console.error("MCP Error:", err);
      setError(
        `Failed to query MCP server: ${err instanceof Error ? err.message : "Unknown error"}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with MCP Server URL input and controls */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold">MCP-UI Test Harness</h1>
            {loadingTime > 0 && (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Resource loading time: {loadingTime}ms
              </div>
            )}
          </div>
          <div className="max-w-md mx-auto space-y-4">
            <div>
              <label
                htmlFor="mcp-url"
                className="block text-sm font-medium mb-2"
              >
                MCP Server URL
              </label>
              <div className="flex gap-2">
                <input
                  id="mcp-url"
                  type="url"
                  value={mcpServerUrl}
                  onChange={e => setMcpServerUrl(e.target.value)}
                  placeholder="Enter MCP server URL..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-background text-foreground"
                />
                <button
                  onClick={listResources}
                  disabled={isLoading || !mcpServerUrl}
                  aria-label={
                    isLoading ? "Fetching resources" : "List resources"
                  }
                  title={isLoading ? "Fetching resources" : "List resources"}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-3 rounded-md transition-colors"
                >
                  {isLoading ? (
                    <svg
                      className="h-5 w-5 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      {/* Fat up arrow */}
                      <path d="M4 12l8-8 8 8h-5v8h-6v-8H4z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {resources.length > 0 && (
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="resource-select"
                    className="text-sm font-medium"
                  >
                    Resource
                  </label>
                  <select
                    id="resource-select"
                    value={selectedResourceName}
                    onChange={e => setSelectedResourceName(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {resources.map(r => (
                      <option key={r.uri} value={r.name}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={querySelectedResource}
                    disabled={isLoading || !selectedResourceName}
                    aria-label={
                      isLoading
                        ? "Reading selected resource"
                        : "Run action on selected resource"
                    }
                    title={
                      isLoading
                        ? "Reading selected resource"
                        : "Run action on selected resource"
                    }
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-3 rounded-md transition-colors"
                  >
                    {isLoading ? (
                      <svg
                        className="h-5 w-5 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        {/* Action icon: play in circle */}
                        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-2.5 5.8l7 4.2-7 4.2V7.8z" />
                      </svg>
                    )}
                  </button>
                </div>
              )}
            </div>

            {error && (
              <div className="p-3 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-md text-red-700 dark:text-red-300 text-sm">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Centered iframe */}
        <div
          className="flex justify-center items-start"
          style={{ paddingTop: "36px" }}
        >
          <iframe
            ref={iframeRef}
            src="/iframe.html"
            className="border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg"
            style={{
              width: "50vw",
              height: "550px",
            }}
            title="MCP Server Interface"
          />
        </div>
      </div>
    </div>
  );
}
