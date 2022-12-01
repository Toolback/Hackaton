// import { ethers } from "ethers";
const abi = require("./diamond.json")
const { ethers } = require("ethers");
require("dotenv").config();

async function retrieve_interface()
{
    try {
        let provider = new ethers.providers.JsonRpcProvider(process.env.MUMBAI_URL);
        const signer = new ethers.Wallet(process.env.SECRET_KEY, provider);
        let protocolContract = new ethers.Contract(process.env.PROTOCOL_ADDRESS, abi, signer);
        return protocolContract;
    } catch (err) {
        throw new Error(`Protocol Interface Request Failed: ${err}`);
    }
}


const getQuestData = async (questId) => {
    try {

        const protocolContract = await retrieve_interface();
        const newTx = await protocolContract.getQuestData(questId)
        // console.log("DB : returned quest Data IS : ", newTx)
        return newTx;
    } catch (err) {
        console.log("testeuh erreuuh :", err)
        throw new Error(`Request failed: ${err}`);
    }
}

const getUserQuestData = async (userAddress) => {
    try {
        const protocolContract = await retrieve_interface();
        const questId = 1; // twitter quest id
        const newTx = await protocolContract.getUserQuestData(questId, userAddress)
        // console.log("DB : returned user quest Data IS : ", newTx)
        return newTx;
    } catch (err) {
        console.log("testeuh erreuuh :", err)
        throw new Error(`Request failed: ${err}`);
    }
}
const updateUsersGoals = async (questId, userAddress, data) => {
    try {
        let protocolContract = await retrieve_interface();
        let newTx = await protocolContract.updateUsersGoals(questId, userAddress, data)
        // console.log("DB : updateUserTwitterData : newTx : ", newTx)
        return true;
    } catch (err) {
        console.log("testeuh erreuuh :", err)
        throw new Error(`Request failed: ${err}`);
    }
}

const setOracleAddress = async () => {
    try {
        let protocolContract = await retrieve_interface();
        let newTx = await protocolContract.setOracleAddress(signer.address)
        return true;
    } catch (err) {
        console.log("testeuh erreuuh :", err)
        throw new Error(`Request failed: ${err}`);
    }
}

const start_tq_newCycle = async (questId) => {
    try {
        let protocolContract = await retrieve_interface();
        let newTx = await protocolContract.newCycle(questId)
        // console.log("DB : updateUserTwitterData : newTx : ", newTx)
        return true;
    } catch (err) {
        console.log("testeuh erreuuh :", err)
        throw new Error(`Request failed: ${err}`);
    }
}

const subscribe_tq_waitingList = async (questId) => {
    try {
        let protocolContract = await retrieve_interface();
        let newTx = await protocolContract.registerWaitingListToQuest(questId)
        // console.log("DB : updateUserTwitterData : newTx : ", newTx)
        return true;
    } catch (err) {
        console.log("testeuh erreuuh :", err)
        throw new Error(`Request failed: ${err}`);
    }
}

const updateBCData = async (userAddress, socialMedia, data) => {
    try {
        let protocolContract = await retrieve_interface();
        let newTx = await protocolContract.updateUserTwitterData(userAddress, socialMedia, data)
        console.log("DB : updateUserTwitterData : newTx : ", newTx)
        return true;
    } catch (err) {
        console.log("testeuh erreuuh :", err)
        throw new Error(`Request failed: ${err}`);
    }
}

const updateUserQuestStatus = async (questId, userAddress, status) => {
    try {
        let protocolContract = await retrieve_interface();
        let newTx = await protocolContract.updateUserTwitterData(questId, userAddress, status)
        // console.log("DB : updateUserTwitterData : newTx : ", newTx)
        return true;
    } catch (err) {
        console.log("testeuh erreuuh :", err)
        throw new Error(`Request failed: ${err}`);
    }
}

// ########## Testing Functions ############# \\

const getAllListedQuest = async () => {
    try {
        let protocolContract = await retrieve_interface();
        let newTx = await protocolContract.getAllActiveQuests()
        // console.log("DB : updateUserTwitterData : newTx : ", newTx)
        return newTx;
    } catch (err) {
        console.log("testeuh erreuuh :", err)
        throw new Error(`Request failed: ${err}`);
    }
}

const updateTwitterHandle = async (questId, handle, address) => {
    try {
        let protocolContract = await retrieve_interface();
        let newTx = await protocolContract.setUserQuestUserName(questId, handle, address)
        // console.log("DB : updateUserTwitterData : newTx : ", newTx)
        return newTx;
    } catch (err) {
        console.log("testeuh erreuuh :", err)
        throw new Error(`Request failed: ${err}`);
    }
}


module.exports = {
    getQuestData,
    getUserQuestData,
    updateUsersGoals,
    setOracleAddress,
    start_tq_newCycle,
    subscribe_tq_waitingList,
    updateBCData,
    updateUserQuestStatus,
    getAllListedQuest,
    updateTwitterHandle
};