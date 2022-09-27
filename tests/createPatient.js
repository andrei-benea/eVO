import EvoLoginPage from '../page_objects/evoLogin';

const evoLogin = new EvoLoginPage();

describe('create patient', async () => {
    it('initialize page', async () => {
        await evoLogin.initPage();
        await evoLogin.evoLogin();
    })
})