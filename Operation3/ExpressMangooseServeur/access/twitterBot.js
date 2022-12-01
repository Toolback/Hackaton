
const libBc = require("../blockchain/libBc");
const getUserTwitterData = require("./getUserTwitterData");

async function handleCycle() {
    const questData = await libBc.getQuestData(1);
    let participants = questData.participants;
    let startPeriod = questData.startPeriod;
    let endPeriod = questData.endPeriod;

console.log("QData 1 =>", Number(questData.questId))
    // let dateStart = send to SM
    // let dateEnd = send to SM
    // add period quest check
    await libBc.updateTwitterHandle(1, "JulienRnlt", "0x25b3d91e2cbAe2397749f2F9A5598366Df26fA49")


    console.log("End =>",)

    // console.log("Starting loop <('_')>", questData)
    // if (participants.length > 0)
    //     await libBc.update_winners(participants, startPeriod, endPeriod);
    // // add period quest check
    // console.log("loop P1 <('_')>")
    // await libBc.start_tq_newCycle(1); // , dateStart, dateEnd
    // // add period quest check

    // if (questData.waitingListAddress.length > 0) {
    //     console.log("loop P2  <('_')>")
    //     await libBc.subscribe_tq_waitingList(1);
    //     // add period quest check


    //     console.log("loop P3 <('_')>")
    //     await libBc.check_for_new_user_goal();
    // }

}

async function update_winners(participants, startPeriod, endPeriod) {
    // init winners array
    // + starting / ending timestamp of the current cycle (safety check)
    const winners = [];
    for (i = 0; i <= participants.length; i++) {
        // const user_data = await getUserQuestData(questData.participants[i]);
        // console.log("USERDATAEE", user_data)
        const uN = "JulienRnlt"; //user_data.userName
        const user_data = await libBc.getUserTwitterData(uN, startPeriod, endPeriod);
        let temp_date;
        let count;
        let status = 1;
        // if (!(user_data.tweetsData.length <= goal))
        //-{}
        for (j = 0; j <= user_data.tweetsData.length; j++) {
            let test2 = user_data.tweetsData[j].created_at;
            let date = test2.substring(0, 10);
            // console.log("RETRIEVED  =>", date);
            if (temp_date != date) {
                temp_date = date;
                count = 0;
            }
            count++;
            if (count >= goal) {
                status = 0; // has lose
                break;
            }
        }

        if ((status = 1)) {
            winners.push(participants[i]);
        }
        // const user_daily_goal = user_data.goal;
    }
    console.log("Winners is =>", winners);
    // push user to winner list if goal succeed
    await libBc.updateUserQuestStatus(1, winners, true);
}

async function check_for_new_user_goal() {
    const qd = await libBc.getQuestData();
    const new_players = qd.newlySubscribedPlayer;
    if (new_players.length > 0) {
        let newlySubscribed = [];
        let data = [];
        const startPeriod = new date(); // should be now
        const endPeriod = new date(); // should be six months back
        for (i = 0; i <= new_players.length; i++) {
            const user_data = await libBc.getUserQuestData(new_players[i]);
            const uN = "JulienRnlt"; //user_data.userName
            const user_TQdata = await libBc.getUserTwitterData(uN, startPeriod, endPeriod);
            let goal = user_TQdata / 31;
            if (goal < 5)
                goal = 5;
            data.push(goal)
            newlySubscribed.push(new_players[i])
        }

        await libBc.updateUsersGoals(1, newlySubscribed, data);
    }
}
module.exports = handleCycle;
