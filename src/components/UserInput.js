import { TextField, Card, Stack, Button, Typography, Link } from "@mui/material";
//import { Link } from "react-router-dom";
import React, { useState } from "react";
import Web3 from "web3";
import SimpleCollectibleFactory from "../ethereum/build/SimpleCollectibleFactory.json";



function UserInput() {

    const [name, setName] = useState("");
    const [symbol, setSymbol] = useState("");
    const [nftAddress, setNftAddress] = useState("");
    const factoryContractAddress = "0xA17a6e01c4eF3aC8fb9b00b089248386c4cE3711";

    async function mintNFTContract(name, symbol) {
        
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        const contract_instance = new web3.eth.Contract(SimpleCollectibleFactory.abi, factoryContractAddress);
        const receipt = await contract_instance.methods.createCollectibleContract(name, symbol).send({
            from: accounts[0]
        });
        console.log(receipt.events.SimpleCollectibleCreated.returnValues.contract_address);
        setNftAddress(receipt.events.SimpleCollectibleCreated.returnValues.contract_address);
    }

    return (
        <Card sx={{ width: 500, maxWidth: 500 }}>
            <Typography gutterBottom textAlign="center" fontWeight="bold" marginTop="20px">Mint the NFT Contract</Typography>
            <Stack spacing={3} margin="30px">
                <TextField fullWidth value={name} label="Name" variant="standard" onChange={(e) => setName(e.target.value)} />
                <TextField fullWidth value={symbol} label="Symbol" variant="standard" onChange={(e) => setSymbol(e.target.value)} />
                <Button variant="contained" onClick={() => mintNFTContract(name, symbol)}>Mint NFT Contract</Button>
                <Link href="/mintnft" underline="hover" sx={{textDecoration: "none"}}>
                    {'Click here if you want to mint NFT from a contract'}
                </Link>
                
                {nftAddress !== "" &&
                    <> 
                    <Typography>Your NFT Contract Address is:</Typography>
                    <Typography sx={{overflowWrap: "break-word"}}>{nftAddress}</Typography>
                    </>
                }
                
            </Stack>


        </Card>

    );
}

export default UserInput;