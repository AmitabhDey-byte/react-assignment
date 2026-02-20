import { useEffect, useState } from "react";

const Artworks = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `https://api.artic.edu/api/v1/artworks?page=${page}`
        );

        const data = await res.json();
        setData(data.data); 
      } catch (err) {
        console.error("Error fetching artworks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchsdata();
  }, [page]);

  return (
    <div>
      {loading && <p>Loading...</p>}

      {data.map((item: any) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.artist_display}</p>
        </div>
      ))}

      <button onClick={() => setPage((p) => p + 1)}>Next Page</button>
    </div>
  );
};

export default Artworks;