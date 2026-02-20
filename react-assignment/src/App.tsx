import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from "react";
const Artworks = () => {
  const [Data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
const res = await fetch(
          `https://api.artic.edu/api/v1/artworks?page=${page}`);
        const data = await res.json();
        setData(data.data); 
      } catch (err) {
        console.error("Error fetching artworks:", err);
      } finally {
        setLoading(false);
      }
    };
 fetchData();
  }, [page]);

  return (
    <div>
<DataTable value={Data} tableStyle={{ minWidth: '50rem' }}>
  <Column field="title" header="Title" />
        <Column field="artist_display" header="Artist" />
        <Column field="place_of_origin" header="Origin" />
        <Column field="date_start" header="Start Year" />
        <Column field="date_end" header="End Year" />
        <Column field="inscriptions" header="Inscriptions" />
</DataTable>
 <button onClick={() => setPage((p) => p + 1)}>Next Page</button>
    </div>
  );
};
export default Artworks;