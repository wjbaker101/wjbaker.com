import dayjs from 'dayjs';

import advancedFormat from 'dayjs/plugin/advancedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import isToday from 'dayjs/plugin/isToday';

dayjs.extend(advancedFormat);
dayjs.extend(relativeTime);
dayjs.extend(isToday);