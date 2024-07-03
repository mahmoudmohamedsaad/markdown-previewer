import React, { useEffect, useState } from 'react';
import '../App.css';

const Docs = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://cors-anywhere.herokuapp.com/https://www.markdownguide.org/api/v1/basic-syntax.json', {
          headers: {
            'Authorization': 'Bearer YOUR_API_KEY_HERE',  // Replace with your actual API key or token
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok, status: ${response.status} ${response.statusText}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          console.error('Received non-JSON content:', text);
          throw new TypeError("Received content is not JSON");
        }

        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="docs-container">
      <h1>Markdown Guide</h1>
      {data && data.map((item, index) => (
        <div key={index} className="ex1">
          <h2>{item.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: item.content }} />
        </div>
      ))}
    </div>
  );
};

export default Docs;
