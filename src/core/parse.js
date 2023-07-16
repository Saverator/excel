export function parse(value = '') {
    if (value.startsWith('=')) {
        try {
            value = value.slice(1)
            return eval(value)
        } catch (e) {
            console.log('Skipping parse error', e.message)
        }
    }
    return value
}