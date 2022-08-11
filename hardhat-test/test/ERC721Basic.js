const {expect} = require('chai')
const {ethers} = require('hardhat')


let Doodles, doodlesContract, accounts, owner

beforeEach( async () => {
    Doodles = await ethers.getContractFactory('ERC721Basic')
    accounts = await ethers.getSigners()
    owner = accounts[0]
    doodlesContract = await Doodles.deploy()
})

describe('ERC721 Basic Testing', () => {
    describe('Deployment', () => {
        it("should set the right owner when deployed", async () => {
            expect(await doodlesContract.owner()).to.equal(owner.address)
        }) 
    } )

})
