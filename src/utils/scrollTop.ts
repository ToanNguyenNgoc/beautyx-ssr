export const scrollTop = (behavior?: 'auto' | 'smooth') => {
       window.scrollTo({ top: 0, behavior: behavior ?? 'smooth' })
}
export default scrollTop