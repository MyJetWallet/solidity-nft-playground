// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SimplNft is ERC721 {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    mapping(uint256 => string) private _tokenUris;

    constructor(string memory tokenName, string memory symbol) ERC721(tokenName, symbol) {
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return "ipfs://";
    }

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        _requireMinted(tokenId);

        string memory baseURI = _baseURI();
        string memory tokenPart = _tokenUris[tokenId];

        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenPart)) : "";
    }

    function mintToken(address owner, string memory metadataURI)
    public
    returns (uint256)
    {
        _tokenIds.increment();

        uint256 id = _tokenIds.current();
        _safeMint(owner, id);
         _tokenUris[id] = metadataURI;

        return id;
    }
}