import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const Header: React.FC = () => {
  return (
    <Box sx={{ 
      width: '100%', 
      display: 'flex', 
      justifyContent: 'center', 
      paddingTop: '30px', 
      paddingBottom: '30px', 
      backgroundColor: '#A4F4F9',
    }}>
      <Typography variant="h3" gutterBottom>
        Covid-19 Statistics
      </Typography>
    </Box>
  );
};
