import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { abi } from "./constants.js";
import { address } from "./constants.js";
import Container from "./Container.jsx";
import "./App.css";

function App() {
  let [ContractBalance, setContractBalance] = useState(null);
  let [SignerBalance, setSignerBalance] = useState(null);
  let [AccountAddress, setAccountAddress] = useState(null);
  let [EthValue, setEthValue] = useState(null);
  const [provider, setprovider] = useState(null);

  useEffect(() => {
    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", () => {
      window.location.reload();
    });
    provider && Connect();
  }, [SignerBalance, ContractBalance]);

  /* Function to connect with metamask wallet. */
  const Connect = async () => {
    if (typeof window.ethereum !== "undefined") {
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.providers.Web3Provider(window.ethereum); //getting provider
      setprovider(provider); //setting provider
      const signer = provider.getSigner(); //getting signer to sign transaction.

      const contractbal = await provider.getBalance(address); //contract balance
      // console.log(ethers.utils.formatEther(balance));
      ContractBalance = ethers.utils.formatEther(contractbal);
      setContractBalance(ContractBalance);

      let signerbal = await provider.getBalance(signer.getAddress());
      SignerBalance = ethers.utils.formatEther(signerbal);
      setSignerBalance(SignerBalance);
      console.log(SignerBalance);
      console.log(signer.getAddress());

      AccountAddress = await signer.getAddress();
      setAccountAddress(AccountAddress);
    } else {
      console.log("Please install metamask!");
    }
  };

  /* Function to fund the contract. */
  const fund = async () => {
    const ethAmount = EthValue;
    if (typeof window.ethereum !== "undefined") {
      // provider/ connection to the blockchain
      // signer / wallet / someone with some gas
      // contract we are interacting with
      // ABI & Address
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setprovider(provider);
      const signer = provider.getSigner();
      const contractWrite = new ethers.Contract(address, abi, signer);
      try {
        const transactionResponse = await contractWrite.fund({
          value: ethers.utils.parseEther(ethAmount),
        });
        // hey wait for this tx to finish
        await listenforTransactionMine(transactionResponse, provider);
        // listern for the tx to be mined
      } catch (error) {
        console.log(error);
      }
      let signerbal = await provider.getBalance(signer.getAddress());
      setSignerBalance(ethers.utils.formatEther(signerbal));
      console.log(SignerBalance);
    }
  };

  const withdraw = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setprovider(provider);
      const signer = provider.getSigner();
      const contractWrite = new ethers.Contract(address, abi, signer);

      try {
        const transactionResponse = await contractWrite.cheaperWithdraw();
        // hey wait for this tx to finish
        await listenforTransactionMine(transactionResponse, provider);
        // listern for the tx to be mined
      } catch (error) {
        console.log(error);
      }

      const contractbal = await provider.getBalance(address);
      setContractBalance(ethers.utils.formatEther(contractbal));
    }
  };

  // function to listen transaction.
  const listenforTransactionMine = (transactionResponse, provider) => {
    // alert(`Mining ${transactionResponse.hash}...`);
    return new Promise((resolve) => {
      // The function returns a Promise, indicating that it is an asynchronous operation.
      // transactionReceipt once the tx is mined transactionReceipt object is created
      provider.once(transactionResponse.hash, (transactionReceipt) => {
        // This event listener listens for an event with the transaction hash (transactionResponse.hash). The event is triggered when the transaction is included in a mined block.
        alert(
          `Transaction: ${transactionResponse.hash} Completed with ${transactionReceipt.confirmations} confirmation`
        );
        resolve();
      });
    });
  };

  return (
    <>
      <Container
        ConnectFun={Connect}
        fundFunction={fund}
        withdrawFunc={withdraw}
        contractBal={ContractBalance}
        signerBal={SignerBalance}
        AccAddress={AccountAddress}
        SetEthVal={setEthValue}
        ETHVal={EthValue}
      />
    </>
  );
}

export default App;
