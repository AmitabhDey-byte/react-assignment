import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useRef } from "react";
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
const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
const [showOverlay, setShowOverlay] = useState(false);
const [selectCount, setSelectCount] = useState("");
  const [page, setPage] = useState(0); 
  const [rows, setRows] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const op = useRef<OverlayPanel>(null);
  const selectedRows = data.filter((row) => selectedIds.has(row.id));
  const onSelectionChange = (e: any) => {
  const currentPageIds = data.map((row) => row.id);
  const newSelectedIds = new Set(selectedIds);
  currentPageIds.forEach((id) => newSelectedIds.delete(id));
  e.value.forEach((row: Artwork) => {
    newSelectedIds.add(row.id);
  });
  setSelectedIds(newSelectedIds);
};
const handleCustomSelection = () => {
  const count = parseInt(selectCount);
  if (!count || count <= 0) return;
  const newSelected = new Set<number>();
 for (let i = 1; i <= count; i++) {
    newSelected.add(i);
  }
  setSelectedIds(newSelected);
  setShowOverlay(false);
  setSelectCount("");
};
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

  return (<>
  <div style={{ marginBottom: "1rem", fontWeight: 500 }}>
  Selected: {selectedIds.size} rows
</div>
<OverlayPanel ref={op}> <div style={{ display: "flex", gap: "0.5rem" }}>
    <InputText value={selectCount}
      onChange={(e) => setSelectCount(e.target.value)} placeholder="Enter number"/>
    <Button label="Apply" onClick={handleCustomSelection} />
  </div>
</OverlayPanel>
    <div style={{ padding: "2rem" }}>
<DataTable value={data} lazy paginator
  rows={rows} totalRecords={totalRecords} loading={loading}
  first={page * rows} onPage={onPageChange} selection={selectedRows}
  onSelectionChange={onSelectionChange} dataKey="id"
  rowsPerPageOptions={[5, 10, 20, 50]}
  tableStyle={{ minWidth: "70rem" }}>
  <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
  <Column field="title" header="Title" />
  <Column field="artist_display" header="Artist" />
  <Column field="place_of_origin" header="Origin" />
  <Column field="date_start" header="Start Year" />
  <Column field="date_end" header="End Year" />
  <Column field="inscriptions" header="Inscriptions" />
</DataTable>
    </div>
    </>
  );
};

export default Artworks;