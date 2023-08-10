// module imports
import moment from 'moment';

const dateHandler = (date) => {

    const now = moment();
    const momentDate = moment(date);
    const time = momentDate.fromNow();
    const dateByHourAndMinute = momentDate.format('h:mm A');

    const getDay = () => {
        let days = time.split(' ')[0];
        days = Number(days);
        if (days < 8) {
            return now.subtract(days, 'days').format('dddd');
        } else {
            return momentDate.format('DD/MM/YYYY');
        }
    }

    if (time === 'a few seconds ago') {
        return 'Now';
    }

    if (time.search('minute') !== -1) {
        const mins = time.split(' ')[0];
        if (mins === 'a') {
            return '1 min';
        } else {
            return `${mins} min`;
        }
    }

    if (time.search('hour') !== -1) {
        return dateByHourAndMinute;
    }

    if (time === 'a day ago') {
        return 'Yesterday';
    }

    if (time.search('days') !== -1) {
        return getDay();
    }

    return time;
}

// Default export
export default dateHandler;