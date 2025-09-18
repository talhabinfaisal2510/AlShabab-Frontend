import React from 'react';
import { Button, Box } from '@mui/material';

const MainMenuButton = ({ onClose }) => {
    const handleClick = () => {
        if (onClose) {
            onClose();
        }
    };

    return (
        <Box sx={{ padding: '50px', display: 'flex', justifyContent: 'center' }}>
            <Button
                disableRipple
                onClick={handleClick}
                sx={{
                    backgroundColor: '#810c3c',
                    color: 'white',
                    borderRadius: '50px',
                    padding: '22px 44px',
                    fontSize: '40px',
                    fontWeight: 'bold',
                    fontFamily: 'Arial, sans-serif',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    minWidth: '520px',
                    height: '100px',
                    border: '4px solid #FFFFFF',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    boxShadow: '0 8px 16px rgba(139, 46, 92, 0.3)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        backgroundColor: '#810c3c',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 24px rgba(139, 46, 92, 0.4)'
                    },
                    '&:active': {
                        transform: 'translateY(0px)',
                        boxShadow: '0 8px 16px rgba(139, 46, 92, 0.3)'
                    }
                }}
            >
					<Box
                    sx={{
                        backgroundColor: 'white',
                        borderRadius: '50%',
						width: '64px',
						height: '64px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
							gap: '6px',
							marginRight: '16px'
                    }}
                >
						<Box sx={{ width: '26px', height: '4px', backgroundColor: '#810c3c', borderRadius: '2px' }} />
						<Box sx={{ width: '26px', height: '4px', backgroundColor: '#810c3c', borderRadius: '2px' }} />
						<Box sx={{ width: '26px', height: '4px', backgroundColor: '#810c3c', borderRadius: '2px' }} />
                </Box>
					<Box sx={{ flex: 1, textAlign: 'right', marginLeft: 'auto', paddingRight: '60px' }}>
						MAIN MENU
					</Box>
            </Button>
        </Box>
    );
};

export default MainMenuButton;