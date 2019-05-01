const pattern = /(?=.*?\d)^(Rp\s?)??(([1-9]\d{0,2}(\.\d{3})*)|\d+)?(,\d{1,2})?$/
const replace = {
    'Rp': '',
    '.': '',
    ',': '.'
};

/**
 * 
 * @param {String} rupiah 
 */
export function validRupiah(rupiah) {
    const isValid = pattern.test(rupiah)

    let value = null
    if (isValid) {
        const str = rupiah.replace(/Rp|\.|,/gi, function (matched) {
            return replace[matched];
        });

        value = parseFloat(str)
    }

    return {
        isValid,
        value
    }
}