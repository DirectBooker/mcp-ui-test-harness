"use client";

import { useState } from "react";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

export default function Home() {
  const [mcpServerUrl, setMcpServerUrl] = useState("http://localhost:3000/mcp");
  const [isLoading, setIsLoading] = useState(false);
  const [carouselData, setCarouselData] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [loadingTime, setLoadingTime] = useState(0);
  const [error, setError] = useState("");
  const [iframeContent, setIframeContent] = useState("<html lang='en-US' data-theme='dark' class='dark' style='--safe-area-inset-top: 0px; --safe-area-inset-bottom: 0px; --safe-area-inset-left: 0px; --safe-area-inset-right: 0px;'><head><style>html,body,#root{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}html,body{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Helvetica Neue,Arial,sans-serif!important}button,input,textarea,select{font-family:inherit}</style></head><body></body></html>");

  const queryCarouselResource = async () => {
    if (!mcpServerUrl) {
      setError("Please enter a MCP server URL");
      return;
    }

    setIsLoading(true);
    setError("");
    const startTime = Date.now();

    try {
      console.log("Attempting to connect to MCP server:", mcpServerUrl);
      
      // Step 1: Initialize MCP connection
      console.log("Sending MCP initialize request...");
      const initResponse = await fetch(mcpServerUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/event-stream',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'initialize',
          params: {
            protocolVersion: '2024-11-05',
            capabilities: {
              resources: {},
            },
            clientInfo: {
              name: 'mcp-harness-client',
              version: '1.0.0',
            },
          },
          id: 1,
        }),
      });

      if (!initResponse.ok) {
        throw new Error(`Initialize failed: ${initResponse.status} ${initResponse.statusText}`);
      }

      const initResult = await initResponse.json();
      console.log("MCP Initialize response:", initResult);

      if (initResult.error) {
        throw new Error(`Initialize error: ${initResult.error.message}`);
      }

      // Step 2: List available resources
      console.log("Listing available resources...");
      const resourcesResponse = await fetch(mcpServerUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/event-stream',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'resources/list',
          params: {},
          id: 2,
        }),
      });

      if (!resourcesResponse.ok) {
        throw new Error(`Resources list failed: ${resourcesResponse.status} ${resourcesResponse.statusText}`);
      }

      const resourcesResult = await resourcesResponse.json();
      console.log("Available resources:", resourcesResult);

      if (resourcesResult.error) {
        throw new Error(`Resources list error: ${resourcesResult.error.message}`);
      }

      // Step 3: Find the Carousel resource
      const resources = resourcesResult.result?.resources || [];
      const carouselResource = resources.find((r: any) => r.name === "Carousel");
      
      if (!carouselResource) {
        throw new Error("Carousel resource not found. Available resources: " + resources.map((r: any) => r.name).join(", "));
      }

      console.log("Found Carousel resource:", carouselResource);

      // Step 4: Read the Carousel resource
      console.log("Reading Carousel resource...");
      const readResponse = await fetch(mcpServerUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/event-stream',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'resources/read',
          params: {
            uri: carouselResource.uri,
          },
          id: 3,
        }),
      });

      if (!readResponse.ok) {
        throw new Error(`Resource read failed: ${readResponse.status} ${readResponse.statusText}`);
      }

      const readResult = await readResponse.json();
      console.log("Carousel resource content:", readResult);

      if (readResult.error) {
        throw new Error(`Resource read error: ${readResult.error.message}`);
      }

      const endTime = Date.now();
      const loadTime = endTime - startTime;

      // Extract the content from the response
      const contents = readResult.result?.contents || [];
      let dataText = "";
      let iframeBodyContent = "";
      
      if (contents.length > 0) {
        const content = contents[0];
        // For dataText (metrics), handle different content types
        if (content.type === "text") {
          dataText = content.text || "";
        } else {
          dataText = JSON.stringify(content, null, 2);
        }
        
        // For iframe, ALWAYS use just the text property if it exists
        iframeBodyContent = content.text || "No text content available";
      }

      setCarouselData(dataText);
      setCharacterCount(dataText.length);
      setLoadingTime(loadTime);
      
      // Update iframe content with contents[0].text
      const updatedHtmlContent = `<html lang='en-US' data-theme='dark' class='dark' style='--safe-area-inset-top: 0px; --safe-area-inset-bottom: 0px; --safe-area-inset-left: 0px; --safe-area-inset-right: 0px;'><head><style>html,body,#root{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}html,body{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Helvetica Neue,Arial,sans-serif!important}button,input,textarea,select{font-family:inherit}</style></head><body>${iframeBodyContent}</body></html>`;
      setIframeContent(updatedHtmlContent);
      
      console.log(`Successfully retrieved Carousel resource: ${dataText.length} characters in ${loadTime}ms`);
      
    } catch (err) {
      console.error("MCP Error:", err);
      setError(`Failed to query MCP server: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with MCP Server URL input and controls */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-center">MCP Server Interface</h1>
          <div className="max-w-md mx-auto space-y-4">
            <div>
              <label htmlFor="mcp-url" className="block text-sm font-medium mb-2">
                MCP Server URL
              </label>
              <input
                id="mcp-url"
                type="url"
                value={mcpServerUrl}
                onChange={(e) => setMcpServerUrl(e.target.value)}
                placeholder="Enter MCP server URL..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-background text-foreground"
              />
            </div>
            
            <button
              onClick={queryCarouselResource}
              disabled={isLoading || !mcpServerUrl}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              {isLoading ? 'Querying Carousel Resource...' : 'Query Carousel Resource'}
            </button>

            {error && (
              <div className="p-3 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-md text-red-700 dark:text-red-300 text-sm">
                {error}
              </div>
            )}

            {(characterCount > 0 || loadingTime > 0) && (
              <div className="space-y-2">
                <div>
                  <label htmlFor="char-count" className="block text-sm font-medium mb-1">
                    Character Count
                  </label>
                  <input
                    id="char-count"
                    type="text"
                    value={characterCount.toLocaleString()}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 text-foreground cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="loading-time" className="block text-sm font-medium mb-1">
                    Loading Time (ms)
                  </label>
                  <input
                    id="loading-time"
                    type="text"
                    value={`${loadingTime}ms`}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 text-foreground cursor-not-allowed"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Centered iframe */}
        <div className="flex justify-center items-start" style={{ paddingTop: "12.5vh" }}>
          <iframe
            src={`data:text/html,${encodeURIComponent(iframeContent)}`}
            className="border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg"
            style={{
              width: "50vw",
              height: "25vh",
            }}
            title="MCP Server Interface"
          />
        </div>
      </div>
    </div>
  );
}
