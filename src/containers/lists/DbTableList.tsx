import { collection, onSnapshot, query } from "@firebase/firestore";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFirestore } from "src/hooks/firebase";
import ReactList from "react-list";

const DbTableList = (props) => {
  const { name, ref, RenderHeader, renderItem } = props;

  const [fetchedData, setFetchedData] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const db = useFirestore();

  useEffect(() => {
    const _ref = ref || collection(db, name);
    const q = query(_ref);
    const unsub = onSnapshot(q, (snap) => {
      let arr = [];
      snap.docs.map((doc) => arr.push(doc.data()));

      setFetchedData(arr);
    });

    return () => {
      unsub();
    };
  }, []);

  const _renderItem = (i) => {
    return renderItem(fetchedData[i], i, fetchedData.length);
  };

  return (
    <div>
      <Box>
        {RenderHeader && <RenderHeader />}
        {renderItem && (
          <ReactList
            itemRenderer={_renderItem}
            length={fetchedData?.length || 0}
            type="simple"
          />
        )}
      </Box>
    </div>
  );
};

export default DbTableList;
