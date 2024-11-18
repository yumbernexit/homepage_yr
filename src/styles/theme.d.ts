import { Palette as PaletteMui, PaletteOptions as PaletteOptionsMui  } from "@mui/material/styles/createPalette";

declare module '@mui/material/styles' {
    interface Palette extends PaletteMui {
      dark?: string;
      ligth?: string;
    }
  
    interface PaletteOptions extends PaletteOptions {
      dark?: string;
      ligth?: string;
    }
  }