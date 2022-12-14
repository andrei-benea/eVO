import EvoLoginPage from '../page_objects/evoLogin';
// import EvoM16 from '../page_objects/evoM16';
import EvoPatients from '../page_objects/evoPatients';

const evoLogin = new EvoLoginPage();
// const evoM16 = new EvoM16();
const evoPatients = new EvoPatients();

describe('create patient', async () => {
    it('initialize & login', async () => {
        await evoLogin.initPage();
        await evoLogin.evoLogin();
        await evoLogin.verifyLogin();
    })
    it('create the patient', async () => {
        await evoPatients.createPatient();
        await evoPatients.searchForPatientPatients();
        await evoPatients.deletePatient();
    })
    it('logout & end', async () => {
        await evoLogin.logoutUser();
        await evoLogin.verifyLogout();
    })
})