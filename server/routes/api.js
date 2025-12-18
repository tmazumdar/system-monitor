import express from "express";
import os from "os";
import _ from "lodash";
import ps from "current-processes";

const router = express.Router();

router.get("/", async (req, res) => {
    res.send({
        cpu: os.cpus(),
        load: os.loadavg(),
        freeRAM: os.freemem(),
        totalRAM: os.totalmem()
    }).status(200);
});

router.get("/processes/", async (req, res) => {
    let proc;

    ps.get((err, processes) => {
        const sorted = _.sortBy(processes, 'cpu');
        proc = sorted.reverse().splice(0,10);
        res.send({
            proc: proc
        })
    })    
});

router.get("/processes/detailed", async (req, res) => {
    ps.get((err, processes) => {
        res.send({
            proc: processes
        })
    })    
});


export default router;