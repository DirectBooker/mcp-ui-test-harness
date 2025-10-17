"use client";

import { useState, useRef, useEffect } from "react";
import { MIDDLE_EARTH_HOTELS } from "@/data/hotels";

const SET_GLOBALS_EVENT_TYPE = 'openai:set_globals' as const;

export default function Home() {
  const [mcpServerUrl, setMcpServerUrl] = useState("http://localhost:3000/mcp");
  const [isLoading, setIsLoading] = useState(false);
  const [carouselData, setCarouselData] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [loadingTime, setLoadingTime] = useState(0);
  const [error, setError] = useState("");
  const [iframeReady, setIframeReady] = useState(false);
  const [pendingGlobals, setPendingGlobals] = useState<Record<string, unknown> | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Set up message listener for iframe ready signals
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'iframe:ready') {
        setIframeReady(true);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Send pending globals when iframe becomes ready
  useEffect(() => {
    if (iframeReady && pendingGlobals) {
      const iframe = iframeRef.current;
      if (iframe && iframe.contentWindow) {
        try {
          iframe.contentWindow.postMessage({
            type: SET_GLOBALS_EVENT_TYPE,
            globals: pendingGlobals
          }, '*');
          setPendingGlobals(null);
        } catch (error) {
          console.error('Failed to send pending globals:', error);
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
      iframe.contentWindow.postMessage({
        type: SET_GLOBALS_EVENT_TYPE,
        globals
      }, '*');
    } catch (error) {
      console.error('Failed to send globals to iframe:', error);
    }
  };

  // Function to update iframe content
  const updateIframeContent = (content: string) => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) {
      return;
    }

    try {
      iframe.contentWindow.postMessage({
        type: 'update_content',
        content
      }, '*');
    } catch (error) {
      console.error('Failed to update iframe content:', error);
    }
  };

  const queryCarouselResource = async () => {
    if (!mcpServerUrl) {
      setError("Please enter a MCP server URL");
      return;
    }

    setIsLoading(true);
    setError("");
    const startTime = Date.now();

    try {
      // Step 1: Initialize MCP connection
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

      if (initResult.error) {
        throw new Error(`Initialize error: ${initResult.error.message}`);
      }

      // Step 2: List available resources
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

      if (resourcesResult.error) {
        throw new Error(`Resources list error: ${resourcesResult.error.message}`);
      }

      // Step 3: Find the Carousel resource
      const resources = resourcesResult.result?.resources || [];
      const carouselResource = resources.find((r: { name: string; uri: string }) => r.name === "Carousel");
      
      if (!carouselResource) {
        throw new Error("Carousel resource not found. Available resources: " + resources.map((r: { name: string }) => r.name).join(", "));
      }

      // Step 4: Read the Carousel resource
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
      
      // Update iframe content via postMessage
      updateIframeContent(iframeBodyContent);
      
      // Set the toolOutput global (will be sent when iframe is ready)
      setIframeGlobals({
        toolOutput: {
          carouselContent: iframeBodyContent,
          hotels: MIDDLE_EARTH_HOTELS,
          metadata: {
            characterCount: dataText.length,
            loadingTime: loadTime,
            timestamp: new Date().toISOString(),
            resourceUri: carouselResource?.uri
          }
        }
      });
      
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

          </div>
        </div>

        {/* Centered iframe */}
        <div className="flex justify-center items-start" style={{ paddingTop: "36px" }}>
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
