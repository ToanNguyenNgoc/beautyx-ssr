import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles'


export function useDeviceMobile() {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down(1023));
    return fullScreen
}

export default useDeviceMobile;

