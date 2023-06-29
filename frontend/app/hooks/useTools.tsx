export function useTools() {

    function formatCurrency(value: number) {
        const signal = Number(value) < 0 ? "-" : ""

        let stringValue = String(value).replace(/\D/g, "")

        value = Number(stringValue) / 100

        stringValue = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + stringValue
    }

    function simplifyFormatCurrency(value: number) {
        let stringValue = ""

        if (String(value).includes(",")) {
            stringValue = String(value).replace(/\D/g, ".")
        }

        value = Number(stringValue) * 100

        return value
    }

    function formatDate(date: String) {

        let dateList = []

        dateList = date.split("-")

        date = `${dateList[2]}/${dateList[1]}/${dateList[0]}`

        return date
    }



    return { formatCurrency, simplifyFormatCurrency, formatDate }
}