import { FC, useState, useEffect } from 'react'
import styles from './SettingsPage.module.scss'
import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import cryptoSelector from '../../redux/selectors/cryptoSelector'
import {
  changeCurrencies,
  changeSlidesToView,
  currenciesInStock,
} from '../../redux/reducers/cryptoReducer'
import { blue, pink } from '@mui/material/colors'
import {
  Button,
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
} from '@mui/material'
import { minCurrenciesToShow } from '../../constants/variables'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import swapSliderSize from '../../utils/swapSliderSize'

const SettingsPage: FC = () => {
  let navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { currencies, followedCurrencies } = useAppSelector(cryptoSelector)
  const [checked, setChecked] =
    useState<currenciesInStock[]>(followedCurrencies)

  const error = checked.length < minCurrenciesToShow

  useEffect(() => {
    if (!error) {
      dispatch(changeSlidesToView(swapSliderSize(checked.length)))
      dispatch(changeCurrencies(checked))
    }
  }, [checked])

  useEffect(() => {
    //получить данные из локал сторейдж и запушить их в checked
  }, [])
  const handleChangeSelfItem = (item: currenciesInStock) => {
    const searchItem = checked.findIndex((checked) => checked === item)
    if (~searchItem) {
      setChecked(checked.filter((el) => el !== item))
    } else {
      setChecked((prev) => [...prev, item])
    }
  }
  const handleSelectAllItems = () => {
    console.log(checked, checked.length)
    if (checked.length === currencies.length) {
      setChecked([])
    } else {
      setChecked(currencies)
    }
  }
  const handleStart = () => {
    navigate('/crypto')
  }
  const colorType = {
    color: 'blue[100]',
    '&.Mui-checked': {
      color: blue[500],
    },
  }

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'row', ml: 3,flexWrap:'wrap',alignItems:'center' }}>
      {currencies.map((item, index) => {

        return (
          <FormControlLabel
              sx={{width:'85px'}}
            label={item}
            key={item}
            control={
              <Checkbox
                checked={checked.some((el) => el === item)}
                onChange={(e) => handleChangeSelfItem(item)}
                sx={colorType}
              />
            }
          />
        )
      })}
    </Box>
  )

  return (
    <div className={styles.container}>
      <FormControl
        required
        error={error}
        component="fieldset"
        sx={{ m: 3 }}
        variant="standard"
      >
        <FormLabel component="legend" sx={{ color: 'white' }}>
          Pick two
        </FormLabel>
        <FormGroup>
          <FormControlLabel
            label="Parent"
            control={
              <Checkbox
                checked={checked.length === currencies.length}
                indeterminate={
                  checked.length !== currencies.length && checked.length !== 0
                }
                sx={colorType}
                onChange={handleSelectAllItems}
              />
            }
          />
          {children}
        </FormGroup>
        {error && (
          <FormHelperText sx={{ color: 'white' }}>
            Please select at least {minCurrenciesToShow} options
          </FormHelperText>
        )}
        {/*<Button type={'transparent'} title={'Go back'} path={'/crypto'}/>*/}
        <Button
          disabled={error}
          onClick={handleStart}
          sx={{width:'200px',alignSelf:'center', color: 'white', marginTop: '10px', '& button': { m: 1 }, '&.Mui-disabled':{color:'gray',border:' 1px solid rgb(77 88 98 / 50%);'} }}
          variant="outlined"
        >
          Save
        </Button>
      </FormControl>
    </div>
  )
}

export default SettingsPage
