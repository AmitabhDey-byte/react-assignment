import{ useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { OverlayPanel } from "primereact/overlaypanel";

interface Artwork {
  id: number;
  title: string;
  artist_display: string;
  place_of_origin: string;
  date_start: number;
  date_end: number;
  inscriptions: string;
}

const ArtworksDataTable = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedArtworks, setSelectedArtworks] = useState<Artwork[]>([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(0);
  const [bulkSelectCount, setBulkSelectCount] = useState<string>("");
  const op = useRef<OverlayPanel>(null);
  const loadData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.artic.edu/api/v1/artworks?page=${page + 1}&limit=${rows}&fields=id,title,artist_display,place_of_origin,date_start,date_end,inscriptions`
      );
      const data = await response.json();
      setArtworks(data.data || []);
      setTotalRecords(data.pagination.total || 0);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [page, rows]);
  const onPageChange = (event: any) => {
    setFirst(event.first);
    setRows(event.rows);
    setPage(event.page);
  };

  const handleBulkSelect = async () => {
    const count = parseInt(bulkSelectCount);
    if (isNaN(count) || count <= 0) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.artic.edu/api/v1/artworks?page=1&limit=${count}&fields=id,title,artist_display,place_of_origin,date_start,date_end,inscriptions`
      );
      const data = await response.json();
      setSelectedArtworks(data.data || []);
      op.current?.hide();
      setBulkSelectCount("");
    } catch (error) {
      console.error("Bulk select error:", error);
    } finally {
      setLoading(false);
    }
  };
  const header = (
      <span>
        {selectedArtworks.length} rows selected
      </span>
  );
  return (
    <div style={{ margin: '20px' }}>
<DataTable
  value={artworks} lazy paginator first={first} rows={rows} totalRecords={totalRecords}
  onPage={onPageChange} loading={loading} dataKey="id" header={header}
  selectionMode="multiple" selection={selectedArtworks}
  onSelectionChange={(e: any) => setSelectedArtworks(e.value)}
  rowsPerPageOptions={[5, 10, 20, 50]}
  tableStyle={{ minWidth: '60rem' }}>
  <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
  <Column field="title" header="Title" />
  <Column field="artist_display" header="Artist" />
  <Column field="place_of_origin" header="Origin" />
  <Column field="date_start" header="Start" />
  <Column field="date_end" header="End" />
</DataTable>
    </div>
  );
};

export default ArtworksDataTable;