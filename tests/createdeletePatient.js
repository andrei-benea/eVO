import EvoLoginPage from '../page_objects/evoLogin';
import EvoM16 from '../page_objects/evoM16';

const evoLogin = new EvoLoginPage();
const evoM16 = new EvoM16();

describe('create patient', async () => {
    it('initialize & login', async () => {
        await evoLogin.initPage();
        await evoLogin.evoLogin();
        await evoM16.verifyLogin();
        await evoM16.createPatient();
        await evoM16.searchForPatient();
        await evoM16.deletePatient();
        await evoM16.logoutUser();
        await evoLogin.verifyLogout();
    })
})