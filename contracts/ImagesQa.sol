pragma solidity ^0.4.4;


contract ImagesQa {
  address owner;

  /* this function is executed at initialization and sets the owner of the contract */
  function ImagesQa() {owner = msg.sender;}

  modifier onlyByOwner()
  {
    require(msg.sender == owner);
    _;
  }

  /* Function to recover the funds on the contract */
  function kill() onlyByOwner {selfdestruct(owner);}

  function() payable {}

  mapping (bytes32 => bool) images;

  function addImage(bytes32 imageId) onlyByOwner public returns (bytes32) {
    images[imageId] = true;

    return imageId;
  }

  function getImage(bytes32 imageId) onlyByOwner public constant returns (bool) {
    return images[imageId];
  }

  function approveImage(address photographerAddress, bytes32 imageId, uint amount) onlyByOwner public returns (bool) {
    if (images[imageId]) {
      delete images[imageId];
      photographerAddress.transfer(amount);

      return true;
    }

    return false;
  }

  function rejectImage(bytes32 imageId) onlyByOwner public returns (bool) {
    if (images[imageId]) {
      delete images[imageId];
      return true;
    }

    return false;
  }
}
