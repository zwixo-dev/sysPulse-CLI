import os, { type } from "os";

let CPU_Model = os.cpus()[0].model;
let CPU_SPEED = os.cpus()[0].speed;

// tracking the CPU usage 
function CPU_Usage() {
    const cpu_infos = os.cpus();
    // check if is not array or i the length of it is empty : if true no cpu exist
    if (!Array.isArray(cpu_infos) || cpu_infos.length === 0) return "Cpu Not found";

    // if that went correct
    let totalTime = 0;
    let totalIdle = 0;

    cpu_infos.forEach((core) => {
        for (const type in core.times) {
            totalTime += core.times[type];
        }
        totalIdle += core.times.idle;
    });

    return { totalTime, totalIdle };
}

export {CPU_Model, CPU_SPEED, CPU_Usage};
