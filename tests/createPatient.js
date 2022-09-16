import EvoLogin from '../page_objects/evoLogin';

const evoLogin = new EvoLogin();

describe('Create a new patient', async () => {
    it('browser initialization', async () => {
        await evoLogin.initPage()
    })
})