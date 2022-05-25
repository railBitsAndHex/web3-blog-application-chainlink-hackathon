import React, { useState, useEffect } from "react";
import { useTx } from "./../context/TransactionContext";
import mappingJson from "../chains/mappings.json";
import { IMappings, TReadSendOptions } from "./../types/txContext.d";
import VaultJson from "../chains/Vault.json";
import MockTokenJson from "../chains/MockToken.json";
import { Moralis } from "moralis";
import { useAuth } from "./../context/AuthContext";
import { useParams } from "react-router-dom";
import { formatEther } from "ethers/lib/utils";
import { BigNumber } from "ethers";
function TokenBalanceInfo() {
  const { donatedDep, withdrawDep } = useTx();
  const { accounts } = useAuth();
  const { uid } = useParams();
  const [balanceWallet, setBalanceWallet] = useState<string>("-");
  const [balanceClaimable, setBalanceClaimable] = useState<string>("-");
  const mappings: IMappings = mappingJson;

  const tokenAddress = mappings["chainId"]["31337"]["MockToken"].address;
  const vaultAddress = mappings["chainId"]["31337"]["VaultContract"].address;

  useEffect(() => {
    const getBalanceWallet = async () => {
      const { abi } = MockTokenJson;
      const readOptions: TReadSendOptions = {
        contractAddress: tokenAddress,
        functionName: "balanceOf",
        abi: abi,
        params: {
          account: accounts[0],
        },
      };
      const balance = await Moralis.executeFunction(readOptions);
      setBalanceWallet(formatEther(BigNumber.from(balance.toString())));
    };
    const getBalanceClaimable = async () => {
      const { abi } = VaultJson;
      const readOptions: TReadSendOptions = {
        contractAddress: vaultAddress,
        functionName: "viewBalance",
        abi: abi,
        params: {
          _donee: accounts[0],
          _tokenAddr: tokenAddress,
        },
      };
      const balance = await Moralis.executeFunction(readOptions);
      console.log(balance);
      setBalanceClaimable(formatEther(BigNumber.from(balance.toString())));
    };
    getBalanceWallet();
    getBalanceClaimable();
  }, [withdrawDep, donatedDep]);
  return (
    <>
      <section>
        <div>
          <div>
            Tokens Claimable:
            <span>
              {balanceClaimable.substring(0, balanceClaimable.indexOf(".") + 2)}{" "}
              mockToken
            </span>
          </div>
          <div>
            Token Balance in wallet:{" "}
            <span>
              {balanceWallet.substring(0, balanceWallet.indexOf(".") + 3)}{" "}
              mockToken
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

export default TokenBalanceInfo;
