const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main(){
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const wallet  = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const abi = fs.readFileSync("./build/simpleStorage_sol_SimpleStorage.abi", "utf-8");
    const binary = fs.readFileSync("./build/simpleStorage_sol_SimpleStorage.bin", "utf-8");
    const contractFactory = new ethers.ContractFactory(abi,binary,wallet);
    console.log("Deploying Please Wait...");
    const contract = await contractFactory.deploy();
    // const deploymentReceipt  = await contract.deployTransaction.wait(1);
    // console.log(deploymentReceipt);

    
    const transactionResponse = await contract.store("3");
    const transactionReciept = await transactionResponse.wait(1);

    const currentFavoriteNumber = await contract.retrieve();
    console.log("Current favorite number: ", currentFavoriteNumber.toString());
} 

main().then(() => process.exit(0)).catch((error) => console.log(error))
 