class Formatters{

    static formatUTCDateStringToLocal(dateUTC: string)
    {
        return new Date(dateUTC).toLocaleTimeString()
    }
}