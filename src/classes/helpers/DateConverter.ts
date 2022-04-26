export default class DateConverter {
    public getDateString(timeStamp: number): string {
        return new Date(timeStamp * 1000).toLocaleDateString();
    }

    public getFullDateString(timeStamp: number): string {
        return new Date(timeStamp * 1000).toLocaleString();
    }
}

export const dateConverter = new DateConverter();
