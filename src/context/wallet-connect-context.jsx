import React, { createContext, useContext, useEffect, useState } from "react";
import {
    createAppKit,
    useAppKitAccount,
    useAppKitProvider,
    useDisconnect,
} from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { bscTestnet, sepolia } from "@reown/appkit/networks";
import { BrowserProvider } from "ethers";
import { useLocation } from "wouter";

// Initialize AppKit Configuration (as per the documentation)

// 1. Get projectId
const projectId = "9c43fd50564535d26d7857d9453e11f6"; // Replace with your actual project ID
if (!projectId)
    throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");

// 2. Set the networks
const networks = [bscTestnet, sepolia];

// 3. Create a metadata object - optional
const metadata = {
    name: "OpenLab",
    description: "OpenLab Description",
    url: "http://localhost:5173", // origin must match your domain & subdomain
    icons: ['https://imgur.com/s0fnDeX'],
};

// 4. Create an AppKit instance
createAppKit({
    adapters: [new EthersAdapter()],
    networks,
    metadata,
    projectId,
    features: {
        analytics: true, // Optional - defaults to your Cloud configuration
    },
    enableWalletConnect: true,
    defaultNetwork: bscTestnet,
});

// Create the context
const WalletConnectContext = createContext();

// Context provider
export const WalletConnectProvider = ({ children }) => {
    const { address, isConnected } = useAppKitAccount();
    const { walletProvider } = useAppKitProvider("eip155");
    const { disconnect } = useDisconnect();
    const [, setLocation] = useLocation(); // For navigation
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const initialize = () => {
            const storedUserData = JSON.parse(localStorage.getItem("userAccount"));
            if (isConnected && address && storedUserData?.account === address) {
                setUserData(storedUserData);
            }
        };

        initialize();
    }, [isConnected, address]);

    const disconnectWallet = () => {
        localStorage.removeItem("userAccount");
        setUserData(null);
        disconnect();
        setLocation("/");
    };

    return (
        <WalletConnectContext.Provider
            value={{
                disconnectWallet,
                userData,
                isConnected,
            }}
        >
            {children}
        </WalletConnectContext.Provider>
    );
};

// Custom hook to use the WalletConnect context
export const useWalletConnect = () => {
    const context = useContext(WalletConnectContext);
    if (!context) {
        throw new Error("useWalletConnect must be used within WalletConnectProvider");
    }
    return context;
};
