import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import Box from "@mui/material/Box";
import {Dispatch, FC, SetStateAction, useEffect, useState} from 'react'
import {changeSortMethod, sortingType} from "redux/reducers/cryptoReducer";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import cryptoSelector from "../../redux/selectors/cryptoSelector";


const Sort:FC = () => {
    const handleChangeCurrency = (event: SelectChangeEvent) => {
        setCurrentSortMode(event.target.value as keyof SetStateAction<sortingType>)
    }
    const {sortingMethod} = useAppSelector(cryptoSelector)
const dispatch = useAppDispatch()
    const [currentSortMode,setCurrentSortMode] = useState<sortingType>(sortingMethod)
    useEffect(()=>{
        dispatch(changeSortMethod(currentSortMode))
    },[currentSortMode,dispatch])
    return ( <FormControl sx={{marginTop:'30px',width:'fit-content' }} fullWidth>
        <Box sx={{ minWidth: 150 }}>
            <InputLabel
                sx={{ color: 'white', borderColor: 'white', '&.Mui-focused':{
                        color: 'white'
                    } }}
                id="selectLabel"
            >
                Sort by
            </InputLabel>
            <Select
                labelId="selectLabel"
                id="selectLabel"
                sx={{ color: 'white', width: '150px', background: '#1A1C91' }}
                value={currentSortMode}
                label="Sort by"
                onChange={handleChangeCurrency}
                variant={'outlined'}
            >
                <MenuItem value={'LTH'}>Low to High</MenuItem>
                <MenuItem value={'HTL'}>High to Low</MenuItem>
                <MenuItem value={'SBN'}>Name</MenuItem>
            </Select>
        </Box>
    </FormControl>)
}
export default Sort