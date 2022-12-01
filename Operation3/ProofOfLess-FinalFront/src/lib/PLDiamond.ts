import ProofOfLessAbi from "./proofOfLess.json";
import {ethers} from "ethers"
import cProvider from "./cProvider";
// import * as dotenv from "dotenv";
// dotenv.config({ path: __dirname+'/.env' });
// require('dotenv').config()

// Free Test USDC

const IPLDiamond = async (signer?:any) => {
    let customP = signer || cProvider
    let contractInstance = new ethers.Contract(
        "0xa6ccE76B22Cf07e28fF7c92B465cb038ab14808B", 
        ProofOfLessAbi, 
        customP
    );
    return contractInstance;
} 

export default IPLDiamond;
