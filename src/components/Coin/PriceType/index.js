import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function ToggleComponents({ priceType, handlePriceTypeChange }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "1.5rem",
      }}
    >
      <ToggleButtonGroup
        value={priceType}
        exclusive
        onChange={(e, newPriceType) => {
          if (newPriceType !== null) {
            handlePriceTypeChange(newPriceType);
          }
        }}
        sx={{
          borderColor: "var(--blue)",
          border: "1px solid var(--blue)",
          borderRadius: "4px",
          "& .MuiToggleButton-root": {
            color: "var(--blue) !important",
            border: "1px solid var(--blue) !important",
            "&.Mui-selected": {
              backgroundColor: "var(--blue) !important",
              color: "#fff !important",
            },
            "&:not(.Mui-selected)": {
              color: "var(--blue) !important",
              borderColor: "var(--blue) !important",
            },
          },
        }}
      >
        <ToggleButton value="prices">Prices</ToggleButton>
        <ToggleButton value="market_caps">Market Cap</ToggleButton>
        <ToggleButton value="total_volumes">Total Volume</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
