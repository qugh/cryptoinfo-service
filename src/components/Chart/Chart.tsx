import React, { useMemo, useCallback, useEffect } from 'react'
import { AreaClosed, Line, Bar } from '@visx/shape';
import appleStock, { AppleStock } from '@visx/mock-data/lib/mocks/appleStock';
import { curveMonotoneX } from '@visx/curve';
import { GridRows, GridColumns } from '@visx/grid';
import { scaleTime, scaleLinear } from '@visx/scale';
import { withTooltip, Tooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip';
import { WithTooltipProvidedProps } from '@visx/tooltip/lib/enhancers/withTooltip';
import { localPoint } from '@visx/event';
import { LinearGradient } from '@visx/gradient';
import { max, extent, bisector } from 'd3-array';
import { timeFormat } from 'd3-time-format';

type TooltipData = AppleStock;
//const stock = appleStock.slice(1250)
const mockData = [
    {
        "date": "2012-03-20T07:00:00.000Z",
        "close": 605.96
    },
    {
        "date": "2012-03-21T07:00:00.000Z",
        "close": 602.5
    },
    {
        "date": "2012-03-22T07:00:00.000Z",
        "close": 599.34
    },
    {
        "date": "2012-03-23T07:00:00.000Z",
        "close": 596.05
    },
    {
        "date": "2012-03-26T07:00:00.000Z",
        "close": 606.98
    },
    {
        "date": "2012-03-27T07:00:00.000Z",
        "close": 614.48
    },
    {
        "date": "2012-03-28T07:00:00.000Z",
        "close": 617.62
    },
    {
        "date": "2012-03-29T07:00:00.000Z",
        "close": 609.86
    },
    {
        "date": "2012-03-30T07:00:00.000Z",
        "close": 599.55
    },
    {
        "date": "2012-04-02T07:00:00.000Z",
        "close": 618.63
    },
    {
        "date": "2012-04-03T07:00:00.000Z",
        "close": 629.32
    },
    {
        "date": "2012-04-04T07:00:00.000Z",
        "close": 624.31
    },
    {
        "date": "2012-04-05T07:00:00.000Z",
        "close": 633.68
    },
    {
        "date": "2012-04-09T07:00:00.000Z",
        "close": 636.23
    },
    {
        "date": "2012-04-10T07:00:00.000Z",
        "close": 628.44
    },
    {
        "date": "2012-04-11T07:00:00.000Z",
        "close": 626.2
    },
    {
        "date": "2012-04-12T07:00:00.000Z",
        "close": 622.77
    },
    {
        "date": "2012-04-13T07:00:00.000Z",
        "close": 605.23
    },
    {
        "date": "2012-04-16T07:00:00.000Z",
        "close": 580.13
    },
    {
        "date": "2012-04-17T07:00:00.000Z",
        "close": 609.7
    },
    {
        "date": "2012-04-18T07:00:00.000Z",
        "close": 608.34
    },
    {
        "date": "2012-04-19T07:00:00.000Z",
        "close": 587.44
    },
    {
        "date": "2012-04-20T07:00:00.000Z",
        "close": 572.98
    },
    {
        "date": "2012-04-23T07:00:00.000Z",
        "close": 571.7
    },
    {
        "date": "2012-04-24T07:00:00.000Z",
        "close": 560.28
    },
    {
        "date": "2012-04-25T07:00:00.000Z",
        "close": 610
    },
    {
        "date": "2012-04-26T07:00:00.000Z",
        "close": 607.7
    },
    {
        "date": "2012-04-27T07:00:00.000Z",
        "close": 603
    },
    {
        "date": "2012-04-30T07:00:00.000Z",
        "close": 583.98
    },
    {
        "date": "2012-05-01T07:00:00.000Z",
        "close": 582.13
    }
]
const stock=appleStock.slice(500)
console.log('stock',stock)
export const background = '#3b6978';
export const background2 = '#204051';
export const accentColor = '#edffea';
export const accentColorDark = '#75daad';
const tooltipStyles = {
    ...defaultStyles,
    background,
    border: '1px solid white',
    color: 'white',
};

// util
const formatDate = timeFormat("%b %d, '%y");

// accessors
const getDate = (d: AppleStock) => new Date(d.date);
const getStockValue = (d: AppleStock) => d.close;
const bisectDate = bisector<AppleStock, Date>((d) => new Date(d.date)).left;

export type AreaProps = {
    width: number;
    height: number;
    margin?: { top: number; right: number; bottom: number; left: number };
};

export default withTooltip<AreaProps, TooltipData>(
    ({
         width,
         height,
         margin = { top: 0, right: 0, bottom: 0, left: 0 },
         showTooltip,
         hideTooltip,
         tooltipData,
         tooltipTop = 0,
         tooltipLeft = 0,
     }: AreaProps & WithTooltipProvidedProps<TooltipData>) => {
        if (width < 10) return null;
        // bounds
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        // scales
        const dateScale = useMemo(
            () =>
                scaleTime({
                    range: [margin.left, innerWidth + margin.left],
                    domain: extent(stock, getDate) as [Date, Date],
                }),
            [innerWidth, margin.left],
        );
        const stockValueScale = useMemo(
            () =>
                scaleLinear({
                    range: [innerHeight + margin.top, margin.top],
                    domain: [0, (max(stock, getStockValue) || 0) + innerHeight / 3],
                    nice: true,
                }),
            [margin.top, innerHeight],
        );

        // tooltip handler
        const handleTooltip = useCallback(
            (event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
                const { x } = localPoint(event) || { x: 0 };
                const x0 = dateScale.invert(x);
                const index = bisectDate(stock, x0, 1);
                const d0 = stock[index - 1];
                const d1 = stock[index];
                let d = d0;
                if (d1 && getDate(d1)) {
                    d = x0.valueOf() - getDate(d0).valueOf() > getDate(d1).valueOf() - x0.valueOf() ? d1 : d0; // значение по x и y (текст)
                }
                showTooltip({
                    tooltipData: d,
                    tooltipLeft: x,
                    tooltipTop: stockValueScale(getStockValue(d)),
                });
            },
            [showTooltip, stockValueScale, dateScale],
        );

        return (
            <div>
                <svg width={width} height={height}>
                    <rect
                        x={0}
                        y={0}
                        width={width}
                        height={height}
                        fill="url(#area-background-gradient)"
                        rx={14}
                    />
                    <LinearGradient id="area-background-gradient" from={background} to={background2} />
                    <LinearGradient id="area-gradient" from={accentColor} to={accentColor} toOpacity={0.1} />
                    <GridRows
                        left={margin.left}
                        scale={stockValueScale}
                        width={innerWidth}
                        strokeDasharray="1,3"
                        stroke={accentColor}
                        strokeOpacity={0}
                        pointerEvents="none"
                    />
                    <GridColumns
                        top={margin.top}
                        scale={dateScale}
                        height={innerHeight}
                        strokeDasharray="1,3"
                        stroke={accentColor}
                        strokeOpacity={0.2}
                        pointerEvents="none"
                    />
                    <AreaClosed<AppleStock>
                        data={stock}
                        x={(d) => dateScale(getDate(d)) ?? 0}
                        y={(d) => stockValueScale(getStockValue(d)) ?? 0}
                        yScale={stockValueScale}
                        strokeWidth={1}
                        stroke="url(#area-gradient)"
                        fill="url(#area-gradient)"
                        curve={curveMonotoneX}
                    />
                    <Bar
                        x={margin.left}
                        y={margin.top}
                        width={innerWidth}
                        height={innerHeight}
                        fill="transparent"
                        rx={14}
                        onTouchStart={handleTooltip}
                        onTouchMove={handleTooltip}
                        onMouseMove={handleTooltip}
                        onMouseLeave={() => hideTooltip()}
                    />
                    {tooltipData && (
                        <g>
                            <Line
                                from={{ x: tooltipLeft, y: margin.top }}
                                to={{ x: tooltipLeft, y: innerHeight + margin.top }}
                                stroke={accentColorDark}
                                strokeWidth={2}
                                pointerEvents="none"
                                strokeDasharray="5,2"
                            />
                            <circle
                                cx={tooltipLeft}
                                cy={tooltipTop + 1}
                                r={4}
                                fill="black"
                                fillOpacity={0.1}
                                stroke="black"
                                strokeOpacity={0.1}
                                strokeWidth={2}
                                pointerEvents="none"
                            />
                            <circle
                                cx={tooltipLeft}
                                cy={tooltipTop}
                                r={4}
                                fill={accentColorDark}
                                stroke="white"
                                strokeWidth={2}
                                pointerEvents="none"
                            />
                        </g>
                    )}
                </svg>
                {tooltipData && (
                    <div>
                        <TooltipWithBounds
                            key={Math.random()}
                            top={tooltipTop - 12}
                            left={tooltipLeft + 12}
                            style={tooltipStyles}
                        >
                            {`$${getStockValue(tooltipData)}`}
                        </TooltipWithBounds>
                        <Tooltip
                            top={innerHeight + margin.top - 14}
                            left={tooltipLeft}
                            style={{
                                ...defaultStyles,
                                minWidth: 72,
                                textAlign: 'center',
                                transform: 'translateX(-50%)',
                            }}
                        >
                            {formatDate(getDate(tooltipData))}
                        </Tooltip>
                    </div>
                )}
            </div>
        );
    },
);