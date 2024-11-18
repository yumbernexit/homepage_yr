import { Box, Button, CardMedia, Container, Grid2,  Link,  Stack, Step, StepLabel, Stepper, Typography } from '@mui/material';
import * as React from 'react';
import { Lock  } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import logo from './media/logo-web-majeeko-150.jpg'
import {  TPropsSteps } from '../../types/form.types';
import StepDataBilling from './steps/StepDataBilling';
import palette from '../../styles/palette';
import StepService from './steps/StepService';
import StepCheckout from './steps/StepCheckout';
import StepDomainRegister from './steps/StepDomainRegister';
import { useNavigate } from 'react-router-dom';
import { MajeekoService } from '../../services/majeeko.service';
import { TMAjeekoInfoDTO, TMajeekoOrderDTO } from '../../types/majeeko.type';
import DialogTermsMajeeko from './components/DialogTermsMajeeko';

export type TOnChangeOrderBillingInfo = {
    name: keyof TMAjeekoInfoDTO;
    value: any;
}


const PaymentMajeeko:React.FC = () => {
    const service = new MajeekoService()
    const {t} = useTranslation();
    const [planSelected, setPlanSelected] = React.useState<string|null>(null);
    const [step, setStep] = React.useState<number>(0)
    const [domainRegister, setDomainRegister] = React.useState<boolean>(false)
    const navigate = useNavigate()
    const [state, setState] = React.useState<Partial<TMajeekoOrderDTO>>({ facebook_page_id:'447881499352017'})
    const [dialog, setDialog] = React.useState<boolean>(false)
    const [typeDialog, setTypeDialog] = React.useState<'terms'|'cookies'|'privacy'|null>(null)

    const steps:TPropsSteps[]  = React.useMemo(()=>{ 
        return [
        { key: 'label_step_1',label: 'Dati Fatturazione', show: true},
        { key: 'label_step_2',label: 'Plan Service', show: true},
        { key:'label_step_register', label: 'Register Domain', show: domainRegister },
        { key: 'label_step_3',label: 'Checkout', show: true}
        ]
    },[domainRegister])

   React.useEffect(()=>{},[planSelected])


    const createOrder = async (body:any) => {
        try {
            let response = await service.postOrderSubscription(body)
            console.log(response)
            //setStep(!!steps[step + 1].show ? step + 1 : step + 2 )
        } catch (error) {
            console.log(error)
        }
    }


    const changeDataBilling = (event:TMAjeekoInfoDTO) => {
        if(!state) return;
        let data = state
        setState({
            ...data,
            billing_info:{
                ...data.billing_info,
                ...event
            } 
        })
    }

    const handleNext = (stp:number) => {
        switch(stp){
            case 0:
                console.log('creare il ordine e utente stripe ');
                createOrder(state)
                //setStep(!!steps[stp + 1].show ? step + 1 : step + 2 )
                break;
            case 1:
                console.log('salvare il cart stripe')
                setStep(!!steps[stp + 1].show ? step + 1 : step + 2 )
                break;
            case 2:
                console.log('salvare il register del dominio')
                setStep(!!steps[stp + 1].show ? step + 1 : step + 2 )
                break;
            case 3:
                console.log('creare il checkout')
                setStep(!!steps[stp + 1].show ? step + 1 : step + 2 )
                break;
        }
    }


   // console.log('payments state', state)
   return ( 
   <Container maxWidth="md">
    <Stack direction={'row'} alignItems={'flex-start'}>
        <Lock fontSize='small' />
        <Typography >{t('majeeko:payment_sicure')}</Typography>
    </Stack>
        <Box sx={{ width:'100%', background:'white',height:'auto'}}>
            <Grid2 container  sx={{py:2, px:3 }}>
                <Grid2 size={{xs:6, sm: 2}} mt={3}>
                    <CardMedia component={'img'} src={logo} width={'100px'} />
                </Grid2>
            </Grid2>
        
            <Grid2 container columns={12} justifyContent={'center'} mt={3}>
            <Stepper activeStep={step}  alternativeLabel>
                    {steps.map((label) => !!label.show && (
                    <Step key={label.key}>
                        <StepLabel>{label.label}</StepLabel>
                    </Step>
                    ))}
                </Stepper>
            </Grid2>
            <Box sx={{border:`1px solid ${palette.disabled.main}`, mt: 1,mx:1, borderRadius:1}}>
                { step === 0 && <StepDataBilling data={state.billing_info as never} onChange={e => changeDataBilling(e as never)}/> }
                { step === 1 && <StepService domainRegister={domainRegister} onDomainRegister={setDomainRegister} />}
                { step === 2 && <StepDomainRegister />}
                { step === 3 && <StepCheckout />}
            </Box>
            <Grid2 display={'flex'} justifyContent={'space-between'} gap={2} sx={{py:2}}>
               {step > 0 ? <Button  onClick={()=> 
                    setStep(!!steps[step - 1].show ? step - 1 : step - 2 )}>Back</Button>: <Button></Button>}
                <Button onClick={()=> handleNext(step) }>NeXT</Button>
            </Grid2>
        </Box>
        <Grid2 mt={2} container columns={12} alignItems={'center'}>
                <Grid2 size={6}>
                    <Typography variant='caption'>Yumber Ramirez</Typography>
                </Grid2>
                <Grid2 size={6} display={'flex'} justifyContent={'flex-end'}>
                    <Link underline='none' sx={{mr:1}} onClick={()=> {
                                setDialog(true)
                                setTypeDialog('terms')
                            }}>
                        <Typography variant="caption" color={palette.dark}>termini e condizioni  </Typography>
                    </Link> 
                    <Link underline='none' sx={{mr:1}} onClick={()=> {
                            setDialog(true)
                            setTypeDialog('privacy')
                        }}>
                        <Typography variant="caption" color={palette.dark}>privacy policy  </Typography>
                    </Link> 
                    <Link  underline='none' sx={{mr:1}} onClick={()=> {
                            setDialog(true)
                            setTypeDialog('cookies')
                        }}>
                        <Typography variant="caption" color={palette.dark}>informativa cookies</Typography>
                    </Link>
                </Grid2>
        </Grid2>
        <DialogTermsMajeeko open={dialog} onClose={setDialog} type={typeDialog}  />
    </Container>)
}

export default PaymentMajeeko

