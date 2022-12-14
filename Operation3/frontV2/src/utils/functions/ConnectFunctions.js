import { ethers } from "ethers";
import { AddNetwork } from "./AddNetwork"

// Wallect Connect 

export const connectWallet = async () => {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    try {
      let windowProvider = new ethers.providers.Web3Provider(window.ethereum);
      let addressArray = await windowProvider.send("eth_requestAccounts", []);
      let provider = await windowProvider.getSigner(addressArray[0]);
      let network = await windowProvider.getNetwork();
      // let testnetwork = await AddNetwork();
      
      // console.log("Network", network.chainId)
      const obj = {
        status: "Connected",
        address: addressArray,
        provider: provider,
        chainId: network.chainId
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }

  } else {
    let jsonRpcProvider = new ethers.providers.JsonRpcProvider(
      "https://polygon-mumbai.g.alchemy.com/v2/pCiM9OJB_7EqE0lZ4Po19LqzoHkwlzVs"
  )
    let obj =  {
      address: "N/A",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
      provider: jsonRpcProvider
    };

    return obj;
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "Connected",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};



// export function addWalletListener() {
//   if (window.ethereum) {
//     window.ethereum.on("accountsChanged", (accounts) => {
//       if (accounts.length > 0) {
//         setPlayer(prevPlayer => {
//           return { ...prevPlayer, address: accounts[0]}
//         });
//         setStatus("👆🏽 Write a message in the text-field above.");
//       } else {
//         setPlayer(prevPlayer => {
//           return { ...prevPlayer, address: "N/A"}
//         });
//         setStatus("🦊 Connect to Metamask using the top right button.");
//       }
//     });
//   } else {
//     setStatus(
//       <p>
//         {" "}
//         🦊{" "}
//         <a target="_blank" href={`https://metamask.io/download.html`}>
//           You must install Metamask, a virtual Ethereum wallet, in your
//           browser.
//         </a>
//       </p>
//     );
//   }
// }

