import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Check from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#0070ff',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#0070ff',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: '#eaeaf0',
    borderTopWidth: 8,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: ownerState.active ? '#0070ff' : '#dce3eb',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  width: '100%',
  '& .QontoStepIcon-completedIcon': {
    color: '#0070ff',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

// const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

export default function CustomStepper({ activeStep, handleNext, handleBack, steps, handleSave }) {
  return (
    <Stack sx={{ width: '100%', padding: '0 20px' }} spacing={4}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}></StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        { activeStep !== 1 && 
          <Button
            className='button button-primary'
            color="inherit"
            disabled={activeStep === 1}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
        }
        
        <Box sx={{ flex: '1 1 auto' }} />
        {activeStep === 5 &&
          <Button onClick={handleNext} className='button button-primary' style={{marginRight: '10px'}}>
            Нет опыта работы
          </Button>
        }
        {activeStep === 6 ? 
          <Button onClick={handleSave} className='button button-primary'>
            Finish
          </Button>
          :
          <Button onClick={handleNext} className='button button-primary'>
            Next
          </Button>
        }
        
      </Box>
    </Stack>
  );
}
