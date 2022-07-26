import React, { FC, useState, useEffect, useMemo } from 'react'
import DatePicker from 'react-datepicker'
import s from './DatePickers.module.css'
import cn from 'clsx'

interface DatePickerProps {
  setTime: React.Dispatch<React.SetStateAction<string>>
  startDate: Date | null
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>
  available_time: string[] | undefined
  className?: string
  time: string
}
export const DatePickers: FC<DatePickerProps> = ({
  setTime,
  startDate,
  setStartDate,
  available_time = [],
  className,
  time,
}) => {
  const [availabeTime, setAvailabeTime] = useState<Date[] | undefined>()

  const getAvailabeTime = (date: Date | null, availabeDate: Date[]) => {
    if (!availabeDate || availabeDate.length === 0 || !date) return
    const targetDay = availabeDate.filter((d) => {
      if (
        d.getDate() === date.getDate() &&
        d.getMonth() === date.getMonth() &&
        d.getFullYear() === date.getFullYear()
      )
        return d
    })
    return targetDay
  }

  const availabeDate = (available_time: string[]): Date[] | [] => {
    const convertedDate: Date[] = []
    if (!available_time) return []
    JSON.parse(available_time as unknown as string).forEach((d: string) => {
      if (new Date(d).getTime() <= new Date().getTime()) return
      let date = new Date(d)
      convertedDate.push(date)
    })
    return convertedDate
  }
  const availabeDates = useMemo(() => {
    return availabeDate(available_time)
  }, [available_time])

  useEffect(() => {
    if (!available_time) return
    const availabeTimes = getAvailabeTime(startDate, availabeDates)
    setAvailabeTime(availabeTimes)
  }, [])
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setTime((e.target as HTMLButtonElement).value)
  }
  return (
    <>
      <div className={className}>
        <DatePicker
          includeDates={availabeDates}
          selected={startDate}
          onChange={(date) => {
            setStartDate(date)
            if (!available_time) return
            const availabeTimes = getAvailabeTime(date, availabeDates)
            setAvailabeTime(availabeTimes)
          }}
          inline
        />
      </div>
      {availabeTime && availabeTime.length !== 0 && (
        <div className="mt-6">
          <h2 className="text-body-1 text-brown">Time</h2>
          <div className="flex-col gap-y-[1px] md:gap-x-[1px] md:gap-y-0 md:flex-row flex w-full flex-wrap mt-2">
            {availabeTime?.map((t, i) => {
              return (
                <button
                  onClick={handleClick}
                  key={i}
                  value={t.toString()}
                  className={cn(
                    'h-[50px] w-full md:max-w-[122px] px-[33px] py-[14px] text-body-2 text-brown focus:text-white  bg-white focus:bg-brown flex justify-center items-center',
                    {
                      [s.focusBtn]: time == t.toString(),
                    }
                  )}
                >
                  {t.toLocaleString('en-US', {
                    hour: 'numeric',
                    //minute: 'numeric',
                    hour12: true,
                  })}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}
