import { Box, Container, CssBaseline, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { AnswerGenerator } from '../AnswerGenerator';
import { ANSWER_GENERATOR_TYPES } from '../AnswerGenerator/AnswerGenerator.types';
import { TabPanel } from '../TabPanel';
import { lightBlue } from '@mui/material/colors';
import { AccuracyAnalyze } from '../AccuracyAnalyze';


export const App: React.FC = () => {
  const [value, setValue] = useState('0');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth={'xl'} sx={{ background: lightBlue[50] }}>
      <CssBaseline />
      <Box
        sx={{
          width: 1200,
          margin: '0 auto',
          px: 10,
          minHeight: '100vh',
          background: 'white',
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
            <Tab label='Да/Нет генератор' value={'0'} />
            <Tab label='8Magic Ball' value={'1'} />
            <Tab label='Анализ точности' value={'2'} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={'0'}>
          <AnswerGenerator type={ANSWER_GENERATOR_TYPES.BOOLEAN} />
        </TabPanel>
        <TabPanel value={value} index={'1'}>
          <AnswerGenerator type={ANSWER_GENERATOR_TYPES.MAGIC_BALL} />
        </TabPanel>
        <TabPanel value={value} index={'2'}>
          <AccuracyAnalyze />
        </TabPanel>
      </Box>
    </Container>
  );
};
