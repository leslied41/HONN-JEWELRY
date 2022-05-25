import React, { FC, useState, useEffect, useRef } from 'react'
import DatePicker from 'react-datepicker'
import { AiOutlineLeft } from 'react-icons/ai'
import { AiOutlineRight } from 'react-icons/ai'
import s from './DatePickers.module.css'
import clsx from 'clsx'

interface DatePickerProps {
  time: string
  setTime: React.Dispatch<React.SetStateAction<string>>
  startDate: Date | null
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>
  available_time: string[] | undefined
}
export const DatePickers: FC<DatePickerProps> = ({
  time,
  setTime,
  startDate,
  setStartDate,
  available_time,
}) => {
  const [timeOfEachDay, setTimeOfEachDay] = useState<string[]>([])
  const timesRef = useRef<HTMLDivElement>(null)

  const btnsGroupClassName = clsx(s.times_container, {
    [s.center]: timeOfEachDay?.length === 3,
  })

  const isWeekday = (date: Date) => {
    const day = date.getDay()
    return day !== 0 && day !== 6 && day !== 2 && day !== 4
  }

  const converTimeFormat = (time: string) => {
    let hour_string = time.split(':')[0]
    let hour = Number(hour_string)
    let minutes = time.split(':')[1]
    let amOrPm
    if (hour > 12) {
      hour = hour - 12
      amOrPm = 'PM'
    } else if (hour == 12) {
      amOrPm = 'PM'
    } else {
      amOrPm = 'AM'
    }
    time = `${hour}:${minutes} ${amOrPm}`
    return time
  }
  useEffect(() => {
    let day = startDate!.getDay()
    switch (day) {
      case 1:
        setTimeOfEachDay(['13:00', '14:00', '16:00'])
        break
      case 3:
        setTimeOfEachDay(['10:00', '12:00', '14:00', '16:00', '17:00'])
        break
      case 5:
        setTimeOfEachDay(['13:00', '14:00', '16:00'])
        break
      default:
        setTimeOfEachDay([])
    }
  }, [startDate])

  const handleMove = (dir: string) => {
    if (timeOfEachDay.length <= 5) return

    if (dir === 'left') {
      if (timesRef.current === null) return
      timesRef.current.style.transform = `translateX(0px)`
    }
    if (dir === 'right') {
      if (timesRef.current === null) return
      timesRef.current.style.transform = `translateX(-55px)`
    }
  }
  return (
    <>
      <div>
        {available_time}
        <DatePicker
          filterDate={isWeekday}
          onChange={(date) => {
            setStartDate(date)
            setTime('')
            if (timesRef.current === null) return
            timesRef.current.style.transform = `translateX(0px)`
          }}
          inline
        />
      </div>
      <div className={s.outter}>
        { timeOfEachDay.length >= 5 &&(
          <AiOutlineLeft
            className={s.control}
            onClick={() => handleMove('left')}
          />
        )}
        <div className={btnsGroupClassName}>
          <div className={s.times} ref={timesRef}>
            {timeOfEachDay &&
              timeOfEachDay.map((t, index) => {
                return (
                  <button
                    key={index}
                    type="button"
                    className={s.time}
                    onClick={() => setTime(t)}
                  >
                    <span className={(t === time) ? s.selected : ''}>{t}</span>
                  </button>
                )
              })}
          </div>
        </div>
        { timeOfEachDay.length >= 5 &&(
          <AiOutlineRight
            className={s.control}
            onClick={() => handleMove('right')}
          />
        )}
      </div>
    </>
  )
}
