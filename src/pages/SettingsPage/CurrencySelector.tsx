import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import Box from "@mui/material/Box";
import {Dispatch, FC, SetStateAction} from "react";

interface ICurrencySelector {
    compareCurr: 'EUR' | 'USD',
    setCompareCurr: Dispatch<SetStateAction<any>>
}

const CurrencySelector:FC<ICurrencySelector> = ({compareCurr,setCompareCurr}) => {
    const handleChangeCurrency = (event: SelectChangeEvent) => {
        setCompareCurr(event.target.value)
    }
    return ( <FormControl sx={{marginTop:'30px'}} fullWidth>
        <Box sx={{ minWidth: 150 }}>
            <InputLabel
                sx={{ color: 'white', borderColor: 'white', '&.Mui-focused':{
                        color: 'white'
                    } }}
                id="selectLabel"
            >
                Currency
            </InputLabel>
            <Select
                labelId="selectLabel"
                id="selectLabel"
                sx={{ color: 'white', width: '150px', background: '#1A1C91' }}
                value={compareCurr}
                label="Currency"
                onChange={handleChangeCurrency}
                variant={'outlined'}
            >
                <MenuItem value={'USD'}>USD</MenuItem>
                <MenuItem value={'EUR'}>EUR</MenuItem>
            </Select>
        </Box>
    </FormControl>)
}
export default CurrencySelector