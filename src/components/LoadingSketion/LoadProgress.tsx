import { Box, LinearProgress } from '@mui/material';
import React, { useState } from 'react';

export function LoadProgress() {
    const [progress, setProgress] = useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 0;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);
    return (
        <div>
            <Box
                style={{
                    position: "fixed",
                    zIndex: 100,
                    top: 0,
                    left: 0
                }}
                sx={{ width: '100%' }}>
                <LinearProgress color="error" variant="determinate" value={progress} />
            </Box>
            <div style={{
                width: '100vw',
                height: 'calc(100vh + 668px)'
            }}>
            </div>
        </div>
    );
}