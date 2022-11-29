import React, {createRef, useEffect, useRef, useState} from 'react';
import {SlCalender} from "react-icons/sl";
import InputField from "../../components/models/InputField";
import Text_field_lg from "../../components/models/Text_field_lg";
import Button_sm from "../../components/models/Button_sm";
import {Schedule} from "../../types/Schedule";
import ColorPicker from "../../components/features/user/ColorPicker";

type Props = {
    setShowScheduleModal: React.Dispatch<React.SetStateAction<boolean>>;
    seeker_id: string;
    company_id: string;
}

const ScheduleModal = ({setShowScheduleModal, seeker_id, company_id}: Props) => {
    const [newSchedule, setNewSchedule] = useState<Schedule>(
        {
            seeker_id,
            company_id,
            title: "",
            date: "",
            endDate: "",
            allDay: false,
            description: "",
            backendColor: "#257e4a"
        }
    )

    const [showColorPallet, setShowColorPallet] = useState<boolean>(false)

    const startDateRef = useRef<HTMLInputElement>(null)
    const startTimeRef = useRef<HTMLInputElement>(null)
    const endDateRef = useRef<HTMLInputElement>(null)
    const endTimeRef = useRef<HTMLInputElement>(null)

    const scheduleDataHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewSchedule({...newSchedule, [e.target.name]: e.target.value});
    }

    const handleAllDay = () => {
        setNewSchedule({...newSchedule, allDay: !newSchedule.allDay})
    }

    const colorHandler = (e: React.MouseEvent<HTMLElement>) => {
        setNewSchedule({...newSchedule, backendColor: e.currentTarget.id})
        setShowColorPallet(false)
    }

    const startDateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let startDate = startDateRef.current!.value + "T" + startTimeRef.current!.value + ":00"
        setNewSchedule({...newSchedule, date: startDate})
    }

    const endDateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let endDate = startDateRef.current!.value + "T" + startTimeRef.current!.value + ":00"
        setNewSchedule({...newSchedule, endDate})
    }

    const createSchedule = () => {
        console.log(newSchedule)
        setShowScheduleModal(false)
    }

    return (
        <div className="bg-modal relative z-[1001]">
            <div className="modal-container wrapper py-6">
                <div className="flex items-center">
                    <SlCalender size={20} className="mr-4"/>
                    <h1 className="text-lg font-bold">Add schedule</h1>
                </div>
                <InputField
                    type={"text"}
                    title={"title"}
                    name={"title"}
                    value={newSchedule.title}
                    placeholder={"title"}
                    onChange={scheduleDataHandler}
                    className={"md:col-span-4 mt-4"}
                />
                <div>
                    <h3 className="text-sm my-2">Start date</h3>
                    <div className="flex gap-2">
                        <input
                            className="font-thin shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type={"date"}
                            ref={startDateRef}
                            id={"date"}
                            onChange={startDateHandler}
                        />
                        <input
                            className={`${newSchedule.allDay ? null : "hidden"} font-thin shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            type={"time"}
                            id={"time"}
                            ref={startTimeRef}
                            onChange={startDateHandler}
                        />
                    </div>
                </div>
                <div>
                    <h3 className="text-sm my-2">End date</h3>
                    <div className="flex gap-2">
                        <input
                            className="font-thin shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type={"date"}
                            ref={endDateRef}
                            id={"date"}
                            onChange={endDateHandler}
                        />
                        <input
                            className={`${newSchedule.allDay ? null : "hidden"} font-thin shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            type={"time"}
                            id={"time"}
                            ref={endTimeRef}
                            onChange={endDateHandler}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 items-center mt-4">
                    <label className="block">
                        <input
                            type="checkbox"
                            name="timeInclude"
                            checked={newSchedule.allDay}
                            onChange={handleAllDay}
                        />
                        <span className="pl-2 font-thin">Include time</span>
                    </label>
                    <ColorPicker
                        setColor={colorHandler}
                        color={newSchedule.backendColor}
                        showColorPallet={showColorPallet}
                        setShowColorPallet={setShowColorPallet}
                    />
                </div>
                <Text_field_lg
                    name={"description"}
                    onChange={scheduleDataHandler}
                    value={newSchedule.description}
                />
                <div className="flex justify-end gap-2 mt-4">
                    <Button_sm
                        title={"create"}
                        color={"text-white"}
                        bg_color={"bg-content-blue"}
                        width={"w-24"}
                        onClick={createSchedule}
                    />
                    <Button_sm
                        title={"close"}
                        color={"bg-content-blue"}
                        bg_color={"bg-white"}
                        width={"w-24"}
                        onClick={() => setShowScheduleModal(false)}
                        className={"border-2"}
                    />
                </div>
            </div>
        </div>
    );
};

export default ScheduleModal;