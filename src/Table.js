import React, { useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


const Table = ({data}) => {
    
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);


    
    const columnName =
    [
        {
            headerName: "Recommended Products", field : "proName"
        },
        
       

    ]

    return (
        <div className="ag-theme-alpine" style={ { height: 200, width: 600 } }>
            <AgGridReact
                rowData={data} 
                columnDefs={columnName}
                rowHeight="auto"
                defaultColDef={{flex:1}}
                >
                
            </AgGridReact>
        </div>
    );
};

export default Table;