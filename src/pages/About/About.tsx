import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

export const About: React.FC = () => {
  return (
    <Box sx={{ width: '70%', padding: '30px' }}>
      <Typography variant="body1" gutterBottom>
        Welcome to this website, where you can explore the latest statistics on COVID-19 cases around the world.
      </Typography>

      <Typography variant="body1" gutterBottom>
        Our website offers two main tabs to help you stay informed on the current state of the pandemic.
      </Typography>
      <br />

      <Typography variant="h4" gutterBottom>
        World WIP
      </Typography>

      <Typography variant="body1" gutterBottom>
        This tab displays the most up-to-date data on COVID-19 cases worldwide, from a specified date to the present day.
      </Typography>
      <br />

      <Typography variant="h4" gutterBottom>
        Live by Country
      </Typography>

      <Typography variant="body1" gutterBottom>
        This tab allows you to view detailed information on COVID-19 cases for a selected country during a specific time frame. This feature can be particularly useful for individuals seeking information on COVID-19 cases in their own country or in countries they plan to visit.
      </Typography>

      <br />
      <Divider />
      <br />

      <Typography variant="body1" gutterBottom>
        This website provides a user-friendly interface with clear and concise data visualization tools to help you navigate the information easily. Our goal is to keep you informed with the latest information so you can make informed decisions regarding your health and safety during the COVID-19 pandemic.
      </Typography>

      <Typography variant="body1" gutterBottom>
        Stay safe and healthy, and thank you for visiting our website.
      </Typography>
    </Box>
  );
};
