import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { deepOrange, teal, cyan, orange } from '@mui/material/colors';

// Create a theme instance.
const theme = extendTheme({
    trello: {
        appBarHeight: '48px',
        boardBarHeight: '58px'
    },
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: teal[500], // Use a specific shade, e.g., teal[500]
                },
                secondary: {
                    main: deepOrange[500], // Use a specific shade, e.g., deepOrange[500]
                },
            }
        },
        dark: {
            palette: {
                primary: {
                    main: cyan[500], // Use a specific shade, e.g., cyan[500]
                },
                secondary: {
                    main: orange[500], // Use a specific shade, e.g., orange[500]
                },
            },
        }
    },
});
export default theme;