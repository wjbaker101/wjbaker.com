import { DateFormatter } from '@backend/util/DateFormatter';

export const Logger = {

    log(message: string): void {
        console.log(`[${DateFormatter.fullDateTime(new Date())}] - ${message}`);
    }
}
