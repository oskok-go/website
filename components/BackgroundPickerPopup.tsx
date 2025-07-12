import React, { useState } from "react";

export const bgStructure = {
  miami: [
    "https://store-eu-par-1.gofile.io/download/direct/79f31b13-b357-4dc4-b496-2964580a5fc3/miami1.jpg",
    "https://store-eu-par-1.gofile.io/download/direct/159c8f84-062d-4c2a-b0aa-30da014ad061/miami2.jpg",
    "https://store-eu-par-2.gofile.io/download/direct/04f40127-6cf0-4580-ace3-7675dcd24e90/miami3.jpg",
    "https://store-eu-par-1.gofile.io/download/direct/8dd82c2f-3f8d-4f8b-9e60-867df72dbaca/miami4.jpg",
    "https://store-eu-par-2.gofile.io/download/direct/c7db033c-8e81-4d7e-a24d-6e8fe4b74fec/miami5.jpg",
    "https://store-eu-par-1.gofile.io/download/direct/7e411ac6-95b2-498d-aa1e-e2de589b2375/miami6.jpg",
    "https://store-eu-par-2.gofile.io/download/direct/e5b7758a-ccfb-4cc5-80a3-ebd0b666a77a/miami7.jpg",
    "https://store-eu-par-2.gofile.io/download/direct/48a390e2-5353-4d2f-b4c1-c66d0f6ab6f9/miami8.jpg",
  ],

  room: [
    "https://store5.gofile.io/download/direct/65086d8a-9600-4b72-a033-062fd9bea176/room1.jpg",
    "https://store5.gofile.io/download/direct/51553bfe-a660-4d8f-9609-63891ee782db/room2.jpg",
    "https://store5.gofile.io/download/direct/5bb0c983-df14-48bf-bee0-12e5d0823cce/room4.jpg",
    "https://store5.gofile.io/download/direct/159cf27f-af65-426d-8d2b-cfe57c171d3c/room5.jpg",
    "https://store5.gofile.io/download/direct/07f91af1-df1d-4651-8688-4ab971ad88bd/room6.jpg",
    "https://store5.gofile.io/download/direct/f327fce1-1fa0-4bfb-b118-0e79f51f87f2/room7.jpg",
  ],

  shop: [
    "https://store5.gofile.io/download/direct/7091e821-b33c-494d-a4a0-7dc596ed4fad/shop1.jpg",
    "https://store5.gofile.io/download/direct/e60bdf6c-5c40-4ddc-be6f-8cb0923f6bfd/shop2.jpg",
    "https://store7.gofile.io/download/direct/4cc3ff31-6fec-4996-86fb-2c6609119276/shop3.jpg",
    "https://store6.gofile.io/download/direct/8b963094-ea67-426a-9c17-68ffaefc929b/shop4.jpg",
    "https://store6.gofile.io/download/direct/144db0cd-ea75-45b1-b926-2ee70166745a/shop5.jpg",
    "https://store6.gofile.io/download/direct/488c4f54-8a3d-4320-a495-ac2a38480f11/shop6.jpg",
  ],
  city: [
    "https://store5.gofile.io/download/direct/243d45ab-cfe7-4189-9b04-3ef2d14ad8aa/city1.jpg",
    "https://store5.gofile.io/download/direct/e04dc3bc-5be4-4716-9506-a35ca96ab59f/city2.jpg",
    "https://store-eu-par-3.gofile.io/download/direct/c1b070a0-2fb3-497d-a224-050162299d49/city3.jpg",
    "https://store6.gofile.io/download/direct/c4b49381-9bf7-4f7e-92e9-91668081991b/city4.jpg",
    "https://store6.gofile.io/download/direct/756514bd-0aea-4cbf-a3f3-3a4380e27aa0/city6.jpg",
    "https://store-eu-par-2.gofile.io/download/direct/80124812-cde2-4e12-a410-1e93441b0ac8/city7.jpg",
    "https://store-eu-par-2.gofile.io/download/direct/be060d9c-8ab4-4c69-a97f-78c80fa02c49/city8.jpg",
  ],
  matrix: [
    "https://cold2.gofile.io/download/direct/3dcdaf69-c985-4740-9f3e-6c7223f9e3de/matrix1.jpg",
    "https://cold5.gofile.io/download/direct/634d2587-34c8-4e37-9941-a837fe0ff295/matrix2.jpg",
    "https://cold1.gofile.io/download/direct/8d318ba9-9aab-4efc-bd69-44cc1ae6ba85/matrix3.jpg",
    "https://cold2.gofile.io/download/direct/065dbd07-5d71-40f3-bbe9-df5852db587c/matrix4.jpg",
    "https://cold5.gofile.io/download/direct/00370615-42b3-473c-9660-b91287fe4946/matrix5.jpg",
    "https://cold5.gofile.io/download/direct/22c1c49f-98e7-4f25-9ce0-f3b1ce5f89d1/matrix6.jpg",
  ],
  fallout: [
    "https://store10.gofile.io/download/direct/feeeb83e-d572-475a-8b67-71958452f308/fallout1.jpg",
    "https://store5.gofile.io/download/direct/be521ce3-d3de-4560-9219-394b53bbf033/fallout2.jpg",
    "https://store10.gofile.io/download/direct/610f2928-33bd-4b69-9465-f2eb7110a9b9/fallout3.jpg",
    "https://store10.gofile.io/download/direct/0e544314-87b0-4d17-b490-cc567d5edf83/fallout4.jpg",
    "https://store10.gofile.io/download/direct/9b591df8-f6f0-4df9-b5a7-8318e4f67310/fallout5.jpg",
    "https://store10.gofile.io/download/direct/76e5a8f5-db5d-4c05-b9f1-5c11d8ecaabd/fallout6.jpg",
    "https://store5.gofile.io/download/direct/ba8545f6-0d6c-4881-816b-b6a03e128821/fallout7.jpg",
    "https://store10.gofile.io/download/direct/d5e290da-3386-44b8-b7f5-c0c3fd377f3a/fallout8.jpg",
    "https://store6.gofile.io/download/direct/d0c39512-b45a-485c-9a97-679155105ab8/fallou13.jpg",
    "https://store6.gofile.io/download/direct/dcea5069-f9e8-48b9-a059-4febb77fce08/fallout10.jpg",
    "https://store10.gofile.io/download/direct/e5bb1b91-3266-4dc5-a3ff-3832cfc4bd1d/fallout11.jpg",
    "https://store6.gofile.io/download/direct/99a37a11-4eec-4e01-926a-677b68466c6f/fallout12.jpg",
    "https://store10.gofile.io/download/direct/59cdf5ab-0bdf-4aa9-a956-c22291c9af46/fallout9.jpg",
  ],

  bladerun: [
    "https://cold3.gofile.io/download/direct/d49ce50c-bd47-4d64-8fbc-cfaa843fd6f4/bladerun(3).jpg",
    "https://cold3.gofile.io/download/direct/17486084-9d03-4fbf-81f3-bf6c790df9df/bladerun(4).jpg",
    "https://cold-eu-agl-1.gofile.io/download/direct/91f67097-8677-4efc-96ae-ce41aedea124/bladerun(5).jpg",
    "https://cold3.gofile.io/download/direct/52c168d2-485d-480e-a7fc-403a7470a2f5/bladerun(6).jpg",
    "https://cold-eu-agl-1.gofile.io/download/direct/69470e19-cff5-4521-90ec-451c7b1f7e2f/bladerun.jpg",
    "https://cold3.gofile.io/download/direct/5c3bba2a-93e1-43bc-9815-4372c75f3503/bladerun1).jpg",
    "https://cold-eu-agl-1.gofile.io/download/direct/16af558d-e387-443a-b7eb-b90e5f3767be/bladerun2).jpg",
  ],
};

type BackgroundPickerPopupProps = {
  onSelect: (src: string) => void;
  onClose: () => void;
  selectedSrc: string | null;
};

const BackgroundPickerPopup = ({
  onSelect,
  onClose,
}: {
  onSelect: (src: string) => void;
  onClose: () => void;
}) => {
  const [category, setCategory] = useState<string>("miami");
  const [selected, setSelected] = useState<string | null>(null);

  const handleClick = (url: string) => {
    setSelected(url);
    onSelect(url);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        color: "#0ff",
        display: "flex",
        zIndex: 999,
        fontFamily: "monospace",
      }}
    >
      <div
        style={{
          width: "200px",
          borderRight: "1px solid #0ff",
          padding: "1rem",
        }}
      >
        <h3 style={{ marginBottom: "1rem" }}>📂 Категории</h3>
        {Object.keys(bgStructure).map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              display: "block",
              marginBottom: "0.5rem",
              color: category === cat ? "#000" : "#0ff",
              backgroundColor: category === cat ? "#0ff" : "transparent",
              border: "1px solid #0ff",
              padding: "6px 12px",
              width: "100%",
              cursor: "pointer",
            }}
          >
            {cat.toUpperCase()}
          </button>
        ))}
        <button onClick={onClose} style={{ marginTop: "2rem", color: "#f00" }}>
          ✖ Закрыть
        </button>
        <div style={{ marginTop: "2rem" }}>
          <button
            disabled={!selected}
            onClick={() => {
              if (selected) {
                onSelect(selected);
                onClose();
              }
            }}
            style={{
              padding: "10px 20px",
              backgroundColor: selected ? "#0f0" : "#333",
              color: selected ? "#000" : "#777",
              border: "1px solid #0f0",
              cursor: selected ? "pointer" : "not-allowed",
              fontFamily: "monospace",
            }}
          >
            ✔ Применить фон
          </button>
        </div>
      </div>

      <div style={{ flex: 1, padding: "1rem", overflowY: "auto" }}>
        <h3 style={{ marginBottom: "1rem" }}>🖼️ Фоны</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {bgStructure[category]?.map((url) => (
            <img
              key={url}
              src={url}
              loading="lazy"
              onClick={() => handleClick(url)}
              style={{
                width: "80px",
                height: "100px",
                objectFit: "cover",
                cursor: "pointer",
                border: selected === url ? "3px solid #0f0" : "2px solid #0ff",
                borderRadius: "4px",
                boxShadow: "0 0 6px #00ffff",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BackgroundPickerPopup;
