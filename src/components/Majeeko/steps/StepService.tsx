import * as React from 'react';
import { useTranslation } from 'react-i18next';
import stripe from 'stripe';
import { TStripePricesDTO } from '../../../types/stripe.types';
import { Box, CardMedia, Checkbox, Grid2, IconButton, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, TextField, Typography } from '@mui/material';
import FormInputSelect from '../../commons/Form/FormInputSelect';
import avatarMajeeko from '../media/avatar_blue.png';
import FormInput from '../../commons/Form/FormInput';
import { Cancel, CancelOutlined, Search } from '@mui/icons-material';
import { MajeekoService } from '../../../services/majeeko.service';
import _ from 'lodash';
import { TMajeekoDomains } from '../../../types/majeeko.type';
import FormInputComboCheckboxGroup from '../../commons/Form/FormInputComboCheckboxGroup';

type Props = {
    onDomainRegister: React.Dispatch<React.SetStateAction<boolean>>;
    domainRegister: boolean;
}

const StepService:React.FC<Props> = (props) => {
    const {t, i18n} = useTranslation();
    const mj = new MajeekoService();
    const service =  new stripe(process.env.REACT_APP_STRIPE_MAJEEKO_TEST as never)
    const [prices, setPrices] = React.useState<TStripePricesDTO[]|null>(null);
    const [planSelected, setPlanSelected] = React.useState<string|null>(null);
    const [domains, setDomains ] = React.useState<TMajeekoDomains[]>([]);
    const [checkDomain, setCheckDomain ] = React.useState<boolean>(false)
    const [domain, setDomain ] = React.useState<string|null>(null)
    const [checked, setChecked] = React.useState<string[]>([]);

    const handleToggle = (value: string) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setChecked(newChecked);
    };

    const getPrices = async () => {
        try {
            const prices = await service.prices.list({
                expand: ['data.product']
            })
            if(!!prices.data) {
                setPrices(prices.data as never)
            }
        } catch (error) {
            console.log(error)        
        }
    }
    const stripeProducts = React.useMemo(()=>{
        if(!prices) return ;
        let products = prices.map(e => e.product.metadata?.type?.includes('plan') ? e : null).filter(Boolean)
        return products
    },[prices])

   React.useEffect(()=>{
    if(!prices){
        getPrices()
    }
   },[prices])


   const getDomainSuggest =  async (domain:string) => {
        try {
            let response = await mj.getSuggestDomain(domain, i18n.language)
            if(!!response){
                setDomains(response)
                setCheckDomain(false)
            }
        } catch (error) {
            console.log(error)
        }
   }

   React.useEffect(()=>{
    if(!!checkDomain){
        getDomainSuggest(domain as never)
    }
   },[checkDomain])

    return (
        <Box sx={{py:2,}}>
            <Grid2 container  sx={{px:3 }}>
                <Grid2 size={{xs:12, sm: 6}} >
                    <Grid2 size={{xs:12,sm:9}} sx={{py:2}}>
                        <FormInputSelect
                            onRemove={()=> null}
                            label="Plans"
                            onChange={(e) => setPlanSelected(e.target.value as never)}
                            width={'100%'}
                            options={stripeProducts?.map(e => ({valueId: e?.id, name:e?.product.name })) as never} />
                    </Grid2>
                    <Grid2  size={{xs:12,sm:9}}  sx={{pb:2, mt:1}}>
                        <FormInput label="Domains" name="domain" width={'100%'} 
                            render={<TextField 
                                sx={{width:'100%',pl:0}}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                              <Typography>www.</Typography>
                                            </InputAdornment>
                                          ),
                                          endAdornment: (
                                            <InputAdornment position='end'>
                                                <IconButton disabled={!domain} onClick={()=> {
                                                    if(!!domains.length){
                                                        setDomains([])
                                                        setDomain(null)
                                                        setCheckDomain(false)  
                                                    }else{
                                                      setCheckDomain(true)  
                                                    } }}>
                                                  {!!domains.length ? <CancelOutlined color="primary" /> : <Search color="primary"  />}
                                                </IconButton>  
                                            </InputAdornment>
                                          )
                                    }
                                }}
                                onChange={(e) => setDomain(e.target.value)} />} />
                        
                    </Grid2>    
                    <Grid2 columns={12} sx={{py:0, mt:-1 }}>
                    <List sx={{p:0}}>
                            {domains.map((e, i:number )=> {
                                if(e.availability === 'AVAILABLE'){
                                return   (
                                <ListItem key={e.tld} sx={{py:0}}>
                                        <ListItemButton sx={{p:0}} onClick={handleToggle(e.domainName as never)} dense>
                                            <ListItemIcon sx={{minWidth:0, mr:1}}>
                                                <Checkbox
                                                sx={{p:0}}
                                                edge="start"
                                                checked={checked.includes(e.domainName)}
                                                tabIndex={-1}
                                                disableRipple
                                                />
                                            </ListItemIcon>
                                            <ListItemText id={'tld_'+i} sx={{m:0}} primary={<Typography variant="caption">{e.domainName}</Typography>} />
                                        </ListItemButton>
                                    </ListItem>
                                    )
                                }
                            }
                            )}    
                        </List> 
                    </Grid2> 
                        
                </Grid2>
                <Grid2 container size={{xs:12,sm:6}} mt={1} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Stack direction={'row'}>
                        <CardMedia component={'img'} src={avatarMajeeko} sx={{width:'120px', height:'120px',filter: 'drop-shadow(2px 4px 4px grey)'}}/>
                        <Stack sx={{lineHeight:1}}>
                            <Typography variant='caption'>Dominio personalizzato (.it/.com/.net)</Typography>
                            <Typography variant='caption'>10 temi grafici</Typography>
                            <Typography variant='caption'>2 caselle email da 1GB</Typography>
                            <Typography variant='caption'>Sincronizzazione automatica</Typography>
                            <Typography variant='caption'>Pagine personalizzate</Typography>
                            <Typography variant='caption'>Indicizzazione Google</Typography>
                        { ['price_1PJEn1Dw8D2tSnuyZ5RiDa2P'].includes(planSelected as never) &&  <Typography variant='caption'>Estensioni (ecommerce, booking, newsletter)</Typography>}
                        </Stack>
                    </Stack>
                </Grid2>
                <Grid2 size={12} mt={3}>
                    <FormInputComboCheckboxGroup 
                        name="domainInfo"
                        defaultValue={props.domainRegister as never}
                        onChange={(e)=> props.onDomainRegister(e.target.checked)}
                        options={[
                            {label:'Register Domain or Domains with other name ?', value:'1', name:'1'}
                        ]}
                        />
                </Grid2>  
            </Grid2>    
                  
        </Box>
    )
}

export default StepService;