import React, { useState } from "react";
import { TextField, Card, Stack, Button, Typography } from "@mui/material";
import Web3 from "web3";
import SimpleCollectibleAbi from "../ethereum/build/SimpleCollectibleAbi.json";

function MintNFT() {
    const [contractAddress, setContractAddress] = useState("");

    async function mintNFT(address) {
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        const contract_instance = new web3.eth.Contract(SimpleCollectibleAbi.abi, address);
        const minting = await contract_instance.methods.createCollectible("None").send({
            from: accounts[0]
        });
        console.log(minting);
    }

    return (
        <Card sx={{ width: 500, maxWidth: 500 }}>
            <Typography gutterBottom textAlign="center" fontWeight="bold" marginTop="20px">Mint your NFT</Typography>
            <Stack spacing={3} margin="30px">
                <TextField fullWidth value={contractAddress} label="Contract Address" variant="standard" onChange={(e) => setContractAddress(e.target.value)} />
                <Button variant="contained" onClick={() => mintNFT(contractAddress)}>Mint an NFT </Button>
            </Stack>
        </Card>
    );
}

export default MintNFT;