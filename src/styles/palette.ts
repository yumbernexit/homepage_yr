
export const color = {
    icon:'#1275BB',
    white:'#fff',
    disabled:'#0000001f'
}   

declare module '@mui/material/styles' {
    interface Palette {
        icon: Palette['primary'];
        white:Palette['secondary'];
        buttonBorder:Palette['secondary'];
        disabled:Palette['primary'];
    }
    interface PaletteOptions {
        icon: Palette['primary'];
        white:Palette['secondary'];
        buttonBorder:Palette['secondary'];
        disabled:Palette['primary'];
    }
}

const palette = {
        primary: {
            main:"#1565c0"
        },
        secondary: {
            main:"#0C216D"
        },
        dark: "#151617",
        light: "#edf0f5",
        icon: {
            main:color.icon,
            contrastColor:color.white
        },
        buttonBorder: '#02426A',
        white: {
            main: color.white
        },
        disabled:{
            main: color.disabled
        }
}
export default palette