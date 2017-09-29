import 'babel-polyfill';

let ImagesQa = artifacts.require('./ImagesQa.sol')

contract('ImagesQa', function(accounts) {
    let contract
    let imageId = web3.sha3('111')

    beforeEach(async function() {
        contract = await ImagesQa.new()
        web3.eth.sendTransaction({from: web3.eth.accounts[0], to: contract.address, value: 10000})
    })

    it('should add image and check if exists', async function() {
        await contract.addImage(imageId)
        assert.equal(await contract.getImage.call(imageId), true, 'Image id 111 should exist.')
        assert.equal(await contract.getImage.call(web3.sha3('222')), false, 'Image id 222 should not exist.')
    })

    it('should add image, approve it and check balances', async function() {
        await contract.addImage(imageId)
        let contractBalanceBefore = web3.eth.getBalance(contract.address)
        let userBalanceBefore = web3.eth.getBalance(accounts[1])
        await contract.approveImage(accounts[1], imageId, 10)
        let contractBalanceAfter = web3.eth.getBalance(contract.address)
        let userBalanceAfter = web3.eth.getBalance(accounts[1])
        assert.equal(contractBalanceBefore.minus(10).equals(contractBalanceAfter), true, 'Contract balance should decreased by 10.')
        assert.equal(userBalanceBefore.plus(10).equals(userBalanceAfter), true, 'Photographer balance should increased by 10.')
    })
})
