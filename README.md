# DataDownloader_For_Aweave
Downloads Blocks, txs, and wallet_lists quickly from random peers, so that mining can be started faster.

## Quickstart guide:
1.(clone repo): git clone https://github.com/Mazzz-zzz/DataDownloader_For_Aweave.git

2.(install nodejs): apt install nodejs

3.(install dependencies): npm install

4.(get peers from Arweave node): node beginprocess getpeers

5.(get blocks, txs, wallet_lists): node beginprocess getdata

## Command details:
Command Structure: `node beginprocess <getpeers|morepeers|getdata> <timeout> <delay(for getdata only)> <starting block (for getdata)> <last block (for getdata)>`
	
default timeout: 3000ms
default delay: 30ms
default starting block: 1
default last block: 332000

**getting peers**(Grabs easily accessible peers from official Arweave node):
`node beginprocess getpeers <timeout>`

**Adding more peers**(Scrapes every peer for unique peers):
`node beginprocess morepeers <timeout>`
	
**Getting data**(Gets block, tx, and wallet_list data in order and stores it.):
`node beginprocess getdata <timeout> <delay> <starting block> <last block>`


