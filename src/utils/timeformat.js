import dayjs from "dayjs";
import Calendar from "dayjs/plugin/calendar";
import CN from "dayjs/locale/zh-cn";
dayjs.extend(Calendar);
dayjs.locale(CN);

export default function formatTime(originTime)
{
  let time = dayjs.unix(originTime).format("YYYY-MM-DD HH:mm:ss");
  let now = dayjs().format("YYYY-MM-DD HH:mm:ss");
  return dayjs(time).calendar(dayjs(now), {
    sameDay: "dddd HH:mm ", // The same day ( Today at 2:30 AM )
    nextDay: "dddd HH:mm", // The next day ( Tomorrow at 2:30 AM )
    nextWeek: "YYYY/MM/DD", // The next week ( Sunday at 2:30 AM )
    lastDay: "dddd HH:mm ", // The day before ( Yesterday at 2:30 AM )
    lastWeek: "YYYY/MM/DD", // Last week ( Last Monday at 2:30 AM )
    sameElse: "YYYY/MM/DD" // Everything else ( 7/10/2011 )
  });
}