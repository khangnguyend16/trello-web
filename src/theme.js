import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
// import { deepOrange, teal, cyan, orange } from '@mui/material/colors';

const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`
const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

// Create a theme instance.
const theme = extendTheme({
    trello: {
        appBarHeight: APP_BAR_HEIGHT,
        boardBarHeight: BOARD_BAR_HEIGHT,
        boardContentHeight: BOARD_CONTENT_HEIGHT,
        columnHeaderHeight: COLUMN_HEADER_HEIGHT,
        columnFooterHeight: COLUMN_FOOTER_HEIGHT
    },
    colorSchemes: {
        // light: {
        //     palette: {
        //         primary: {
        //             main: teal[500], // Use a specific shade, e.g., teal[500]
        //         },
        //         secondary: {
        //             main: deepOrange[500], // Use a specific shade, e.g., deepOrange[500]
        //         },
        //     }
        // },
        // dark: {
        //     palette: {
        //         primary: {
        //             main: cyan[500], // Use a specific shade, e.g., cyan[500]
        //         },
        //         secondary: {
        //             main: orange[500], // Use a specific shade, e.g., orange[500]
        //         },
        //     },
        // }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    '*::-webkit-scrollbar': {
                        width: '8px',
                        height: '8px'
                    },
                    '*::-webkit-scrollbar-thumb': {
                        backgroundColor: '#dcdde1',
                        borderRadius: '8px'
                    },
                    '*::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: 'white'
                    }
                }
            }
        },
        // Name of the component
        MuiButton: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    textTransform: 'none',
                    borderWidth: '0.5px',
                    '&:hover': { borderWidth: '0.5px' }
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                // Name of the slot
                root: { fontSize: '0.875rem' }
            },
        },
        MuiTypography: {
            styleOverrides: {
                // Name of the slot
                root: {
                    '&.MuiTypography-body1': { fontSize: '0.875rem' }
                }
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                // Name of the slot
                root: {
                    fontSize: '0.875rem',
                    '& fieldset': { borderWidth: '0.5px !important' },
                    '&:hover fieldset': { borderWidth: '1px !important' },
                    '&.Mui-focused fieldset': { borderWidth: '1px !important' }
                }
            },
        },
    },
});
export default theme;