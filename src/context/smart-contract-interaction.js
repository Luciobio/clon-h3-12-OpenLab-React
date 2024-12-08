import React from "react";
import { useAppKitProvider, useAppKitAccount } from "@reown/appkit/react";
import { BrowserProvider, Contract, formatUnits } from "ethers";

const USDTAddress = "0x617f3112bf5397D0467D315cC709EF968D9ba546";
const USDTAbi = [
  "function balanceOf(address) view returns (uint)",
];

const BalanceComponent = () => {
  const { address, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider("eip155");

  const getBalance = async () => {
    if (!isConnected) {
      console.error("User is not connected");
      return;
    }

    const ethersProvider = new BrowserProvider(walletProvider);
    const signer = await ethersProvider.getSigner();
    const USDTContract = new Contract(USDTAddress, USDTAbi, signer);

    const balance = await USDTContract.balanceOf(address);
    console.log(`Balance: ${formatUnits(balance, 18)}`);
  };

  return <button onClick={getBalance}>Get USDT Balance</button>;
};

export default BalanceComponent;