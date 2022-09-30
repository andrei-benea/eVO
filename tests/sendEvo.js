import EvoLoginPage from '../page_objects/evoLogin';
import EvoM16 from '../page_objects/evoM16';

const evoLogin = new EvoLoginPage();
const evoM16 = new EvoM16();

describe('create patient', async () => {
    it('initialize & login', async () => {
        await evoLogin.initPage();
        await evoLogin.evoLogin();
        await evoLogin.verifyLogin();
    })
    it('search for patient', async () => {
        await evoM16.searchForPatientM16();
    })
    it('logout & end', async () => {
        await evoLogin.logoutUser();
        await evoLogin.verifyLogout();
    })
})