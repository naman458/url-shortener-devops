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

  // LOAD ANALYTICS WHEN PAGE LOADS
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

      // REFRESH DASHBOARD
      fetchUrls();

    } catch (error) {

      console.log(error);

      alert("Error shortening URL");
    }
  };

  return (
    <div style={styles.container}>

      <h1>Cloud URL Shortener</h1>

      {/* INPUT SECTION */}
      <div style={styles.form}>

        <input
          type="text"
          placeholder="Enter URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          style={styles.input}
        />

        <button
          onClick={handleShorten}
          style={styles.button}
        >
          Shorten URL
        </button>

      </div>

      {/* GENERATED SHORT URL */}
      {shortUrl && (

        <div style={styles.result}>

          <p>Generated Short URL:</p>

          <a
            href={shortUrl}
            target="_blank"
            rel="noreferrer"
          >
            {shortUrl}
          </a>

        </div>
      )}

      {/* ANALYTICS TABLE */}
      <h2 style={{ marginTop: "50px" }}>
        Analytics Dashboard
      </h2>

      <table style={styles.table}>

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

              <td>
                {new Date(
                  url.createdAt
                ).toLocaleString()}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

const styles = {

  container: {
    padding: "40px",
    fontFamily: "Arial",
  },

  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },

  input: {
    width: "400px",
    padding: "10px",
  },

  button: {
    padding: "10px 20px",
    cursor: "pointer",
  },

  result: {
    marginTop: "20px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
};

export default App;