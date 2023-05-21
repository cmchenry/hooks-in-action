import { useRef } from "react";
import { FaChevronLeft, FaCalendarDay, FaChevronRight, FaCalendarCheck} from "react-icons/fa";
import {addDays, shortISO } from "../../utils/date-wrangler";
import {useBookingsParams} from "./bookingsHooks";


export default function WeekPicker () {
    const textBoxRef = useRef();

    const {date, setBookingsDate : gotoDate} = useBookingsParams();

    const dates = {
        prev: shortISO(addDays(date, -7)),
        next: shortISO(addDays(date, 7)),
        today: shortISO(new Date())
    }

    return (
        <div>
            <p className="date-picker">
                <button className="btn" onClick={() => gotoDate(dates.prev)}>
                    <FaChevronLeft />
                    <span>Prev</span>
                </button>

                <button className="btn" onClick={() => gotoDate(dates.today)}>
                    <FaCalendarDay />
                    <span>Today</span>
                </button>
                <span>
                    <input type="text" ref={textBoxRef} placeholder="e.g. 2020-09-02" defaultValue= "2020-06-24"/>
                    <button className="go btn" onClick={() => gotoDate(textBoxRef.current.value)}>
                        <FaCalendarCheck/>
                        <span>Go</span>
                    </button>
                </span>
                <button className="btn" onClick={() => gotoDate(dates.next)}>
                    <FaChevronRight />
                    <span>Next</span>
                </button>               
            </p>
        </div>
    );
}