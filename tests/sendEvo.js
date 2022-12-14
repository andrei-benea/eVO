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
    it('select hmv set', async () => {
        await evoM16.selectHmvSet();
    })
    it('search for diagnosis', async () => {
        await evoM16.searchSelectDiagnosis();
    })
    it('select vo type', async () => {
        await evoM16.selectVoType();
    })
    it('define additional info', async () => {
        await evoM16.definePrescriptionAdditions();
    })
    it('define sending options', async () => {
        await evoM16.chooseSendOption();
    })
    it('choose service provider', async () => {
        await evoM16.chooseLe();
    })
    it('verify decision', async () => {
        await evoM16.verifyDecision();
    })
    it('logout & end', async () => {
        await evoLogin.logoutUser();
        await evoLogin.verifyLogout();
    })
})