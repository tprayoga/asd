import React, { useState } from "react";

const ProdukAktif = () => {
  const [page, setPage] = useState(1);

  const pageDisplay = () => {
    if (page === 1) {
      return <>as</>;
    }
  };

  return (
    <div>
      <div>asasd</div>
    </div>
  );
};

export default ProdukAktif;
