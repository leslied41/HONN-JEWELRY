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
  // time,
  setTime,
  startDate,
  setStartDate,
  available_time,
}) => {
  // const [timeOfEachDay, setTimeOfEachDay] = useState<string[]>([])
  const timesRef = useRef<HTMLDivElement>(null)

  // const btnsGroupClassName = clsx(s.times_container, {
  //   [s.center]: timeOfEachDay?.length === 3,
  // })

  // const isWeekday = (date: Date) => {
  //   const day = date.getDay()
  //   return day !== 0 && day !== 6 && day !== 2 && day !== 4
  // }

  // const converTimeFormat = (time: string) => {
  //   let hour_string = time.split(':')[0]
  //   let hour = Number(hour_string)
  //   let minutes = time.split(':')[1]
  //   let amOrPm
  //   if (hour > 12) {
  //     hour = hour - 12
  //     amOrPm = 'PM'
  //   } else if (hour == 12) {
  //     amOrPm = 'PM'
  //   } else {
  //     amOrPm = 'AM'
  //   }
  //   time = `${hour}:${minutes} ${amOrPm}`
  //   return time
  // }
  // useEffect(() => {
  // let day = startDate!.getDay()
  // switch (day) {
  //   case 1:
  //     setTimeOfEachDay(['13:00', '14:00', '16:00'])
  //     break
  //   case 3:
  //     setTimeOfEachDay(['10:00', '12:00', '14:00', '16:00', '17:00'])
  //     break
  //   case 5:
  //     setTimeOfEachDay(['13:00', '14:00', '16:00'])
  //     break
  //   default:
  //     setTimeOfEachDay([])
  // }
  // }, [startDate])

  // const handleMove = (dir: string) => {
  //   if (timeOfEachDay.length <= 5) return

  //   if (dir === 'left') {
  //     if (timesRef.current === null) return
  //     timesRef.current.style.transform = `translateX(0px)`
  //   }
  //   if (dir === 'right') {
  //     if (timesRef.current === null) return
  //     timesRef.current.style.transform = `translateX(-55px)`
  //   }
  // }

  const showAvailabeTime = (time: string | number | Date) => {
    const selectedDate = new Date(time)
    const currentDate = new Date()
    let convertedTime: number[] = []
    const timeString = available_time ? available_time.toString() : ''
    if (available_time) {
      JSON.parse(timeString).forEach((time: string | number | Date) => {
        let date = new Date(time)
        convertedTime.push(date.getTime())
      })
    }
    return (
      convertedTime.includes(selectedDate.getTime()) &&
      currentDate.getTime() < selectedDate.getTime()
    )
  }

  const availabeDate = () => {
    let convertedDate: Date[] = []
    const timeString = available_time ? available_time.toString() : ''
    if (available_time) {
      JSON.parse(timeString).forEach((time: string | number | Date) => {
        let date = new Date(time)
        convertedDate.push(date)
      })
    }
    return convertedDate
  }

  return (
    <>
      <div>
        <DatePicker
          // filterDate={isWeekday}
          filterTime={showAvailabeTime}
          includeDates={availabeDate()}
          selected={startDate}
          onChange={(date) => {
            setStartDate(date)
            // setTime('')
            // if (timesRef.current === null) return
            // timesRef.current.style.transform = `translateX(0px)`
          }}
          // minTime={new Date(0, 0, 0, 10, 30)} // 7:30am
          // maxTime={new Date(0, 0, 0, 16, 30)} // 4:30pm
          timeIntervals={30}
          showTimeSelect
          inline
        />
      </div>
      {/* <div className={s.outter}>
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
      </div> */}
    </>
  )
}
