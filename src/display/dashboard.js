import { CPU_Model, CPU_SPEED, CPU_Usage } from "../core/cpu.js";
import { getFree_Memory, getTotal_memo } from "../core/memory.js";
import { getNetworkUploadSpeed, getNetworkDownloadSpeed} from "../core/network.js";
import { diskSpace } from "../core/disk.js";
import ansiColors from "ansi-colors";

// ---- function for cpu tracking ----
let startTrack = CPU_Usage();

function cpuTracking() {
  const endTrack = CPU_Usage();

  // calculating the diff
  const totalIdleDiff = endTrack.totalIdle - startTrack.totalIdle;
  const totalTimeDiff = endTrack.totalTime - startTrack.totalTime;
  if (totalTimeDiff === 0) return 0;
  startTrack = endTrack;
  return 100 - Math.floor((100 * totalIdleDiff) / totalTimeDiff);
}

setInterval(async() => {
    // wait until i get the network data :)
    const networkUploadSpeed = await getNetworkUploadSpeed();
    const networkDownloadSpeed = await getNetworkDownloadSpeed();

    // process.stdout.write("\x1b[5A\x1b[0G");
    process.stdout.write("\x1b[H");
    // 
    process.stdout.write(`\x1b[K${ansiColors.bold("CPU Model:")} ${ansiColors.green(`${CPU_Model}`)}\n`);
    process.stdout.write(`\x1b[K${ansiColors.bold("CPU Speed:")} ${ansiColors.green(`${CPU_SPEED} MHz`)}\n`);
    process.stdout.write(`\x1b[K${ansiColors.bold("CPU Usage:")} ${ansiColors.green(`${cpuTracking()}%`)}\n`);
    process.stdout.write(`\x1b[K${ansiColors.bold("RAM:")} ${ansiColors.green(`${getTotal_memo()}/${getFree_Memory().toFixed(4)} GB`)}\n`);
    process.stdout.write(`\x1b[K${ansiColors.bold("Disk:")} T ${ansiColors.green(`${diskSpace.totalSpace} GB`)} | F ${ansiColors.green(`${diskSpace.freeSpace} GB`)} | U ${ansiColors.green(`${diskSpace.usedSpace} GB`)}\n`);

    // network infos 
    // upload
    if(networkUploadSpeed && Object.keys(networkUploadSpeed).length === 3){
        process.stdout.write(`\x1b[K${ansiColors.bold("Network Upload:")} ${ansiColors.cyan(`${networkUploadSpeed.bps}bps | ${networkUploadSpeed.kbps}kbps | ${networkUploadSpeed.mbps}mbps`)}\n`);
    }else{
        process.stdout.write(`\x1b[K${ansiColors.bold("Network Upload:")} ${ansiColors.red("loading...!")}\n`);
    }
    // download
    if(networkDownloadSpeed && Object.keys(networkDownloadSpeed).length === 3){
        process.stdout.write(`\x1b[K${ansiColors.bold("Network Download:")} ${ansiColors.cyan(`${networkDownloadSpeed.bps}bps | ${networkDownloadSpeed.kbps}kbps | ${networkDownloadSpeed.mbps}mbps`)}\n`);
    }else{
        process.stdout.write(`\x1b[K${ansiColors.bold("Network Dowload:")} ${ansiColors.red("loading...!")}\n`);
    }


}, 1000);