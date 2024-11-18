import * as React from 'react';
import FormInput from './FormInput';
import { Box, IconButton, InputAdornment, List, ListItem, ListItemButton, ListItemText, Stack, TextField, Typography } from '@mui/material';
import { Clear, Search } from '@mui/icons-material';
import { TFormInputListFilterOption } from '../../../types/form.types';



type Props = {
    name:string;
    width: string | number;
    label: string;
    data: TFormInputListFilterOption | null;
    options: Array<TFormInputListFilterOption>;
    onSelected:React.Dispatch<React.SetStateAction<TFormInputListFilterOption | null>>;
    onSearch: (filter: string) => void;
}

const FormInputListFilter:React.FC<Props> = (props) => {
    // elemento selezionato nel form - da propagare ai livelli superiori
    const [selected, setSelected] = React.useState<TFormInputListFilterOption|null>(null)

    // valore attuale nel form di ricerca
    const [inputValue, setInputValue] = React.useState<string>("")

    // flag per decidere se mostrare o meno gli elementi filtrati
    const [showFilteredResults, setShowFilteredResults] = React.useState<boolean>(false)

    // elementi filtrati
    const [filteredResults, setFilteredResults] = React.useState<Array<TFormInputListFilterOption>>(props.options);
    
    // indice dell'elemento selezionato con le frecce della tastiera, a seguito di una ricerca
    const [selectedIndex, setSelectedIndex] = React.useState(-1);

    // riferimento agli elementi: serve per scrollare all'elemento giusto a seguito della pressione delle frecce
    const itemRefs = React.useRef<(HTMLLIElement | null)[]>([]);

    // scrolla all'elemento selezionato
    const scrollToSelectedItem = (index: number) => {
        if (itemRefs.current[index]) {
          itemRefs.current[index]?.scrollIntoView({
            block: 'nearest',
            inline: 'start',
          });
        }
    };
    
    // inizializza la lista degli elementi
    React.useEffect(()=>{
        setFilteredResults(props.options)
    },[props.options])

    // a seguito della selezione di un elemento, propaga la selezione e imposta il valore corrente nel form di ricerca
    React.useEffect(()=>{
        // if(!!selected){
            props.onSelected(selected)
            selected !=null ? setInputValue(selected.name) : setInputValue("");
        // }
        
    },[selected])

    // imposta l'elemento selezionato
    React.useEffect(()=>{
        // if(!!props.data){
            setSelected(props.data)
        // }
    },[props.data])

    // aggiorna il valore corrente nel form di ricerca e resetta l'indice (nessun elemento selezionato)
    const handleInputChange = (event: any) => {
        setInputValue(event.target.value);
        setSelectedIndex(-1);
    }

    // gestisce la selezione di un elemento
    const handleSelectItem = (opt: TFormInputListFilterOption) => {
        setSelected(opt);
        hideResults();
    }

    // gestisce pressione tasti 
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        // a seguito di un "Invio" bisogna effettuare la ricerca oppure selezionare l'elemento corrispondente all'indice (se presente) 
        if (event.key === 'Enter'){
            if (selectedIndex<0)
                filterResults();
            else
                handleSelectItem(filteredResults[selectedIndex]);
        }

        // "Esc": togli il focus
        if (event.key === 'Escape'){
            hideResults();
        } 

        // Frecce "Su" e "Giù": modifica dell'indice dell'elemento da selezionare
        if (event.key === 'ArrowDown') {
            setSelectedIndex((prevIndex) => {
              const newIndex = prevIndex < filteredResults.length - 1 ? prevIndex + 1 : prevIndex;
              scrollToSelectedItem(newIndex);
              return newIndex;
            });
          } else if (event.key === 'ArrowUp') {
            setSelectedIndex((prevIndex) => {
              const newIndex = prevIndex > 0 ? prevIndex - 1 : prevIndex;
              scrollToSelectedItem(newIndex);
              return newIndex;
            });
          }
    }

    // filtra i risultati, sulla base del contenuto del filtro di ricerca (inputValue)
    // resetta l'indice dell'elemento da selezionare e abilita la visualizzazione degli elementi filtrati
    const filterResults = () => {
        if (!canFilter()) // la ricerca può essere fatta solo se ci sono almeno 3 caratteri
            return;
        // let res = props.options.filter(e => e.name.toLowerCase().includes(inputValue.toLowerCase()))
        // setFilteredResults([...res]);
        props.onSearch(inputValue);
        setSelectedIndex(-1);
        setShowFilteredResults(true);
    }

    // resets filtered results
    const hideResults = () => {
        setSelectedIndex(-1);
        setShowFilteredResults(false);
    }

    // nasconde la visualizzazione degli elementi filtrati, nel momento in cui si clicca fuori dal componente 'filter-stack'
    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        const relatedTarget = e.relatedTarget as HTMLElement;
        if (relatedTarget && relatedTarget.closest('.filter-stack')) {
          return;
        }
        hideResults();
    };

    // la ricerca può essere fatta solo se ci sono almeno 3 caratteri
    const canFilter = () => {
        return inputValue.length>=3;
    }

    return (<FormInput 
        width={props.width}
        label={props.label}
        name={props.name}
        render={
            <React.Fragment>
                <Box width={'100%'} >
                    <Stack className='filter-stack' onBlur={handleBlur} width="100%" sx={{position: 'absolute'}}>
                        <TextField  
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyDown={(e)=> handleKeyDown(e)}
                            InputProps={{
                             endAdornment:<InputAdornment position='end' sx={{borderLeft:'1px solid grey'}}>
                                {selected==null || inputValue!=selected.name ? 
                                <IconButton sx={{p:0}} onClick={filterResults} disabled={!canFilter()}>
                                    <Search color={canFilter() ? 'primary' : 'disabled'}/>
                                </IconButton>
                                :
                                <IconButton sx={{p:0}} onClick={() => setSelected(null)}>
                                    <Clear color='error'/>
                                </IconButton>
                                }
                             </InputAdornment>}}
                        />
                        <Box sx={{mt:1, zIndex:1000}}>
                             <List sx={{background:'#e5eff8', maxHeight:400, overflow:'scroll', overflowX:'hidden'}}>
                                {
                                    showFilteredResults && filteredResults.map((opt, index) => (
                                        <ListItem sx={{width:'100%'}} ref={(el) => (itemRefs.current[index] = el)}>   
                                            <ListItemButton selected={selectedIndex === index} sx={{px:1, py:2 }} onClick={() => handleSelectItem(opt)} >
                                            <ListItemText sx={{width:'33%'}} primary={<Typography variant="body2">{opt.name}</Typography>} />
                                            </ListItemButton>
                                        </ListItem> 
                                    ))
                                }  
                            </List>
                        </Box>
                    </Stack>
                </Box>
            </React.Fragment>
        }
    />)
}

export default FormInputListFilter;