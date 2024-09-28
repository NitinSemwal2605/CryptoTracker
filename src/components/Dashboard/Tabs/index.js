// TabsComponent.js
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import React, { useState } from 'react';
import Grid from '../Grid/index';
import List from '../List/index'; // Import the List component
import './styles.css';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff', // White color for text
    },
    background: {
      default: '#333333', // Dark background for the panels
    },
    secondary: {
      main: '#2196f3', // Blue color for the indicator and shadows
    },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          color: 'var(--white)', // Default color for the tabs
          width: '58vw',
          fontSize: '1.2rem',
          fontWeight: 600,
          fontFamily: 'Inter',
          textTransform: 'capitalize',
          '&.Mui-selected': {
            color: '#2196f3', // Blue color for the selected tab
          },
        },
      },
    },
    MuiTabIndicator: {
      styleOverrides: {
        root: {
          backgroundColor: '#2196f3', // Blue color for the indicator
          boxShadow: '0px 2px 4px rgba(33, 150, 243, 0.3)', // Blue shadow for the indicator
        },
      },
    },
    MuiTabPanel: {
      styleOverrides: {
        root: {
          color: 'var(--white)', // Text color inside TabPanel
          padding: '16px',
          fontSize: '1rem',
        },
      },
    },
  },
});

export default function TabsComponent({ coins }) {
  const [value, setValue] = useState('grid');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <TabContext value={value}>
          <Box>
            <TabList onChange={handleChange} variant="fullWidth">
              <Tab label="Grid" value="grid" />
              <Tab label="List" value="list" />
            </TabList>
          </Box>
          <TabPanel value="grid">
            <div className="grid-flex">
              {coins.map((coin, i) => (
                <Grid coin={coin} delay={i} key={i} />
              ))}
            </div>
          </TabPanel>
          <TabPanel value="list">
            <List coins={coins} />
          </TabPanel>
        </TabContext>
      </Box>
    </ThemeProvider>
  );
}
