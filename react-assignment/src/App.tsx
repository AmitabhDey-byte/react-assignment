import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";

interface Artwork {
  id: number;
  title: string;
  artist_display: string;
  place_of_origin: string;
  date_start: number;
  date_end: number;
  inscriptions: string;
}

const Artworks = () => {
  const [data, setData] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0); 
  const [rows, setRows] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://api.artic.edu/api/v1/artworks?page=${page + 1}&limit=${rows}
          &fields=id,title,artist_display,place_of_origin,date_start,date_end,inscriptions`
        );
       const result = await response.json();
       setData(result.data);
        setTotalRecords(result.pagination.total);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      } finally { setLoading(false);
      }
    };

    fetchData();
  }, [page, rows]);

  const onPageChange = (event: any) => {
    setPage(event.page);
    setRows(event.rows);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <DataTable
        value={data}
        lazy
        paginator
        rows={rows}
        totalRecords={totalRecords}
        loading={loading}
        first={page * rows}
        onPage={onPageChange}
        rowsPerPageOptions={[5, 10, 20, 50]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        tableStyle={{ minWidth: "70rem" }}
      >
        <Column field="title" header="Title" />
        <Column field="artist_display" header="Artist" />
        <Column field="place_of_origin" header="Origin" />
        <Column field="date_start" header="Start Year" />
        <Column field="date_end" header="End Year" />
        <Column field="inscriptions" header="Inscriptions" />
      </DataTable>
    </div>
  );
};

export default Artworks;