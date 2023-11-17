import { getCategory } from "@/app/api/category/getCategory";
import { createTheme } from "@mui/material/styles";

const categoryInfo = getCategory(new Date().getDate());

/*
 ⨯ Error: Not implemented.
    at eval (./app/components/ThemeRegistry/theme.ts:11:96)
    at (ssr)/./app/components/ThemeRegistry/theme.ts (C:\Users\Botnet2\Desktop\Skript Kiddy\Randle\.next\server\app\page.js:271:1)
    at __webpack_require__ (C:\Users\Botnet2\Desktop\Skript Kiddy\Randle\.next\server\webpack-runtime.js:33:42)  
    at eval (./app/components/ThemeRegistry/ThemeRegistry.tsx:12:64)
    at (ssr)/./app/components/ThemeRegistry/ThemeRegistry.tsx (C:\Users\Botnet2\Desktop\Skript Kiddy\Randle\.next\server\app\page.js:260:1)
    at __webpack_require__ (C:\Users\Botnet2\Desktop\Skript Kiddy\Randle\.next\server\webpack-runtime.js:33:42)
*/
const theme = createTheme(categoryInfo.theme);

export default theme;
