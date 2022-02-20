import { FC } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
  ReferenceLine,
} from 'recharts'
import { CryptoCurrency } from '../../types/CryptoCurrency'

export interface IChart3 {
  data: Array<CryptoCurrency>
}

const Chart: FC<IChart3> = ({ data }) => {
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend
            verticalAlign="bottom"
            wrapperStyle={{ lineHeight: '40px' }}
          />
          <ReferenceLine y={0} stroke="#000" />
          <Line type="monotone" dataKey="high" stroke="#82ca9d" />
          <Line type="monotone" dataKey="low" stroke="red" />
          <Brush
            startIndex={0}
            dataKey="title"
            height={30}
            fill="rgba(0, 0, 0, 0)"
            stroke="green"
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}

export default Chart
