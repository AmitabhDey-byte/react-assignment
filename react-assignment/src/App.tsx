import { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
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
  const [bulkCount, setBulkCount] = useState<number | null>(null);
  const overlayRef = useRef<OverlayPanel>(null);
 const fetchArtworks = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.artic.edu/api/v1/artworks?page=${page + 1}&limit=${rows}&fields=id,title,artist_display,place_of_origin,date_start,date_end,inscriptions`
      );
      const data = await response.json();
      setArtworks(data.data || []);
      setTotalRecords(data.pagination?.total || 0);
    } catch (error) {
      console.error("Error fetching artworks:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchArtworks();
  }, [page, rows]);
  const onPageChange = (event: any) => {
    setFirst(event.first);
    setRows(event.rows);
    setPage(event.page);
  };
  const handleBulkSelect = async () => {
    if (!bulkCount || bulkCount <= 0) {
      alert("Enter a valid number");
      return;
    }
   setLoading(true);
    try {
      const response = await fetch(
        `https://api.artic.edu/api/v1/artworks?page=1&limit=${bulkCount}&fields=id,title,artist_display,place_of_origin,date_start,date_end,inscriptions`
      );
      const data = await response.json();
      setSelectedArtworks(data.data || []);
      overlayRef.current?.hide();
      setBulkCount(null);
    } catch (error) {
      console.error("Bulk select error:", error);
    } finally {
      setLoading(false);
    }
  };

  const header = (
    <>
      <span>{selectedArtworks.length} rows selected</span>
      <Button
        label="Bulk Select"
        onClick={(e) => overlayRef.current?.toggle(e)}/>
    </>
  );
return (
    <>
      <OverlayPanel ref={overlayRef} appendTo={document.body}>
        <InputNumber
          value={bulkCount}
          onValueChange={(e) => setBulkCount(e.value ?? null)}/>
        <Button label="Select" onClick={handleBulkSelect}/>
      </OverlayPanel>
<DataTable
        value={artworks} lazy paginator first={first} rows={rows}
        totalRecords={totalRecords} onPage={onPageChange} loading={loading}
        dataKey="id" selectionMode="multiple" selection={selectedArtworks}
        onSelectionChange={(e: any) => setSelectedArtworks(e.value)}
        rowsPerPageOptions={[5, 10, 20, 50]}
        header={header}>
        <Column selectionMode="multiple" />
        <Column field="title" header="Title" />
        <Column field="artist_display" header="Artist" />
        <Column field="place_of_origin" header="Origin" />
        <Column field="date_start" header="Start" />
        <Column field="date_end" header="End" />
      </DataTable>
    </>
  );
};

export default ArtworksDataTable;