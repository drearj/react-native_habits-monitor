import clsx from "clsx";
import dayjs from "dayjs";
import { TouchableOpacity, Dimensions, TouchableOpacityProps } from "react-native";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5);

interface Props extends TouchableOpacityProps {
    amountOfHabits?: number;
    amountCompleted?: number;
    date: Date;
}

export function HabitDay({date, amountCompleted = 0, amountOfHabits = 0, ...rest} : Props) {

    const amountAccomplishedPercentagem = amountOfHabits > 0 ? generateProgressPercentage(amountOfHabits, amountCompleted) : 0;
    const today = dayjs().startOf('day').toDate();
    const isCurrentDay = dayjs(date).isSame(today, 'day');

    return (
        <TouchableOpacity
            className={clsx('rounded-lg border-2 m-1', {
                ["bg-zinc-900 border-zinc-800"]: amountAccomplishedPercentagem === 0,
                ["bg-violet-900 border-violet-700"]: amountAccomplishedPercentagem > 0 && amountAccomplishedPercentagem < 20,
                ["bg-violet-800 border-violet-600"]: amountAccomplishedPercentagem >= 20 && amountAccomplishedPercentagem < 40,
                ["bg-violet-700 border-violet-500"]: amountAccomplishedPercentagem >= 40 && amountAccomplishedPercentagem < 60,
                ["bg-violet-600 border-violet-500"]: amountAccomplishedPercentagem >= 60 && amountAccomplishedPercentagem < 80,
                ["bg-violet-500 border-violet-400"]: amountAccomplishedPercentagem >= 80,
                ["border-white border-4"]: isCurrentDay
            })}
            style={{ width: DAY_SIZE, height: DAY_SIZE }}
            activeOpacity={0.7}
            {...rest}
        />
    );
}