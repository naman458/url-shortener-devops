import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [urls, setUrls] = useState([]);

  // FETCH ALL URL ANALYTICS
  const fetchUrls = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/analytics/all"
      );

      setUrls(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // LOAD DATA ON PAGE LOAD
  useEffect(() => {
    fetchUrls();
  }, []);

  // CREATE SHORT URL
  const handleShorten = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/shorten",
        {
          originalUrl,
        }
      );

      setShortUrl(response.data.shortUrl);

      // refresh table
      fetchUrls();
    } catch (error) {
      console.log(error);
      alert("Error shortening URL");
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Cloud URL Shortener</h1>

      {/* INPUT */}
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Enter URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          style={{ width: "400px", padding: "10px" }}
        />

        <button onClick={handleShorten} style={{ padding: "10px 20px" }}>
          Shorten URL
        </button>
      </div>

      {/* RESULT */}
      {shortUrl && (
        <div style={{ marginTop: "20px" }}>
          <p>Generated Short URL:</p>
          <a href={shortUrl} target="_blank" rel="noreferrer">
            {shortUrl}
          </a>
        </div>
      )}

      {/* ANALYTICS */}
      <h2 style={{ marginTop: "50px" }}>Analytics Dashboard</h2>

      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Original URL</th>
            <th>Short URL</th>
            <th>Clicks</th>
            <th>Created At</th>
          </tr>
        </thead>

        <tbody>
          {urls.map((url) => (
            <tr key={url._id}>
              <td>{url.originalUrl}</td>

              <td>
                <a
                  href={`http://localhost:5000/${url.shortCode}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {url.shortCode}
                </a>
              </td>

              <td>{url.clicks}</td>

              <td>{new Date(url.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;