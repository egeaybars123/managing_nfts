import { Typography, Box, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import { shortenAddress } from "../shortenAddress";
import Web3 from "web3";

function Welcome() {

    const [currentAccount, setCurrentAccount] = useState("");
    const [ethBalance, setEthBalance] = useState("");

    useEffect(() => {
        activate();
    }, []);


    return (
        <Box className="TopBox">
            <Typography sx={{
                fontWeight: "550",
                fontSize: "1.8rem",
                color: '#C4FCEF',
                textAlign: "center"
            }}>
                Welcome,
            </Typography>
            <Typography sx={{
                fontWeight: "500",
                fontSize: "1.1rem",
                color: "#C4FCEF",
                opacity: "0.9",
                textAlign: "center"
            }}
            >
                {shortenAddress(currentAccount)}
            </Typography>

            {ethBalance !== "" &&
                <Stack direction="row" spacing={2} justifyContent="center">
                    <Typography sx={{
                        fontWeight: "500",
                        fontSize: "1.1rem",
                        color: "#C4FCEF",
                        opacity: "0.9",
                        textAlign: "center"
                    }}
                    >
                        ETH Balance:
                    </Typography>
                    <Typography sx={{
                        fontWeight: "500",
                        fontSize: "1.1rem",
                        color: "#C4FCEF",
                        opacity: "0.9",
                        textAlign: "center"
                    }}
                    >
                        {parseFloat(ethBalance).toFixed(4)}
                    </Typography>

                </Stack>
            }
        </Box>

    );

    async function activate() {
        if (window.ethereum) {
            window.ethereum.on('chainChanged', () => {
                window.location.reload();
            })
            window.ethereum.on('accountsChanged', () => {
                window.location.reload();
            })
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const web3 = new Web3(window.ethereum);
                const balance = await web3.eth.getBalance(accounts[0]);
                const format = web3.utils.fromWei(balance, "ether");
                setEthBalance(format);
                setCurrentAccount(accounts[0]);
                console.log("after check");

            } catch (err) {
                console.log('user did not add account...', err);
            }
        }

        console.log("after eternity", currentAccount);

    }


}

export default Welcome;
