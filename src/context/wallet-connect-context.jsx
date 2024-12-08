import React, { createContext, useContext, useEffect, useState } from "react";
import {
    createAppKit,
    useAppKitAccount,
    useAppKitNetwork,
    useAppKitState,
    useDisconnect,
    useAppKitProvider,
    useAppKit,
} from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { bscTestnet, sepolia, defineChain } from "@reown/appkit/networks";
import { BrowserProvider } from "ethers";
import { useLocation } from "wouter";

// 1. Get projectId
const projectId = '9c43fd50564535d26d7857d9453e11f6'; // Replace with your actual project ID
if (!projectId)
    throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");

// 2. Set the networks
const networks = [bscTestnet, sepolia];

// 3. Create a metadata object - optional
const metadata = {
    name: "OpenLab",
      description: "OpenLab Description",
      url: "http://localhost:5173", // origin must match your domain & subdomain
      icons: ['https://scontent.fcor11-2.fna.fbcdn.net/v/t39.30808-1/269694531_441723630878696_3299973595450555219_n.png?stp=cp0_dst-png_s80x80&_nc_cat=108&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeGi4FOSCRaYHVILIAGW8Kw-_34FjvSIDSX_fgWO9IgNJUxhAzkdOLndtSkC2ZSYoRo&_nc_ohc=bFITwBpHUB4Q7kNvgFgNucP&_nc_zt=24&_nc_ht=scontent.fcor11-2.fna&_nc_gid=AAjwNHqUlg3tQwv3BDR_Hiv&oh=00_AYBNlMTQRn6F_NmHbk43RtHDjJkk1LFfNp602n1leitIXA&oe=67526570'],
};

// 4. Create AppKit instance
createAppKit({
    adapters: [new EthersAdapter()],
    networks,
    metadata,
    projectId,
    allWallets: "ONLY_MOBILE",
    allowUnsupportedChain: false,
    features: {
        analytics: true,
        swaps: false,
        email: false,
    },
    enableWalletConnect: true,
    defaultNetwork: bscTestnet,
});

// Context creation
const WalletConnectContext = createContext();

// Context provider
export const WalletConnectProvider = ({ children }) => {
    const { open, close } = useAppKit();
    const { address, isConnected } = useAppKitAccount();
    const { disconnect } = useDisconnect();
    const { walletProvider } = useAppKitProvider("eip155");
    const [userData, setUserData] = useState(null);
    const [, setLocation] = useLocation();

    useEffect(() => {
        const initConnection = async () => {
            if (!isConnected) return;

            const storedUserData = JSON.parse(localStorage.getItem("userAccount"));
            if (storedUserData && storedUserData.account !== address) {
                handleDisconnect();
                return;
            }

            await handleConnect(storedUserData);
        };

        initConnection();
    }, [isConnected, address]);

    const handleConnect = async (storedUserData) => {
        try {
            if (!isConnected) await open();

            const ethersProvider = new BrowserProvider(walletProvider);
            const signer = await ethersProvider.getSigner();

            const network = await ethersProvider.getNetwork();

            if (!storedUserData || storedUserData.chainId !== network.chainId) {
                await signer.signMessage(
                    "Welcome to the Reown Appkit Wallet Boilerplate!"
                );

                const shortAddress = formatAddress(address);
                const userAccount = { account: address, chainId: network.chainId, shortAddress };

                saveUserData(userAccount, signer);
                if (close) await close();
            } else {
                setUserData(storedUserData);
            }

            setLocation("/");
        } catch (error) {
            console.error("Error connecting to wallet:", error);
        }
    };

    const handleDisconnect = () => {
        localStorage.removeItem("userAccount");
        setUserData(null);
        disconnect();
        setLocation("/");
    };

    const formatAddress = (address) =>
        `${address.slice(0, 6)}...${address.slice(-4)}`;

    const saveUserData = (userAccount, signer) => {
        localStorage.setItem("userAccount", JSON.stringify(userAccount));
        setUserData(userAccount);
    };

    return (
        <WalletConnectContext.Provider
            value={{
                open,
                close,
                connectWallet: handleConnect,
                disconnectWallet: handleDisconnect,
                isConnected,
                userData,
            }}
        >
            {children}
        </WalletConnectContext.Provider>
    );
};

// Hook for consuming the context
export const useWalletConnect = () => {
    const context = useContext(WalletConnectContext);
    if (!context) {
        throw new Error("useWalletConnect must be used within a WalletConnectProvider");
    }
    return context;
};
