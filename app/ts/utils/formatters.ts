class Formatters{

    static formatUTCDateStringToLocal(dateUTC: string)
    {
        
        const dateLocal = new Date(dateUTC).toLocaleString()
        return dateLocal
    }
}