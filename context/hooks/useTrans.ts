import langVi from '../../public/locales/vi';
import langEn from '../../public/locales/en'
import { useRouter } from 'next/router';
// import useStorage from './useStorage';

const useTrans = () => {
    // const { getItem } = useStorage();
    const { locale } = useRouter();
    // const localeStorage = getItem('lang', "local");
    // const lang = localeStorage ? localeStorage : locale
    // console.log(lang)
    const trans = locale === 'vi' ? langVi : langEn;
    return trans
}
export default useTrans