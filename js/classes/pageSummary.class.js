class Summary extends Page {
    async summeryContent() {
        let daytime = Join.sayDaytime()
        let nDDay, nDMonth, nDYear;
        let summeryData = await getSummeryData()
        const doneTasks = summeryData['doneCount']
        const todoTasks = summeryData['todosCount']
        const nextDeadline = summeryData['lateDate']
        const progressCount = summeryData['progressCount']
        const feedbackCount = summeryData['feedbackCount']
        const urgendTasks = summeryData['urgendCount']
        let greetedUser = (Join.signedAccount.name === "Guest") ? "" : Join.signedAccount.name;
        
        
        return /*html*/ `
        <div id="summery" class="summery">
        <div id="welcomeOverlay" class="welcome-animation-overlay d-none">
            <h1 class="welcome-respon-headline">${daytime}</h1><h1 class="welcome-respon-headline" id="greetedUser">${greetedUser}</h1>
        </div>
            <div class="summeryHeadline">
                <h1 class="">Join 704</h1>
                <img src="./IMG/Vector 3.png" alt="">
                <p>Key Metrics at a Glance</p>
            </div>
            <div class="seperating-line-res">
                <img src="./IMG/vector-5.png" alt="">
            </div>
            <div class="contentArea">
                <div class="chipsArea">
                    <div class="greetingAreaRes"><h3>${daytime}</h3><h4 id="greetedUser">${greetedUser}</h4></div>
                    <div class="chipsAreaRow">
                        <div class="chip2x" onclick="boardPage()">
                            <div class="chipIcon" ></div>
                            <div class="chipData2x">
                                <h1>${todoTasks}</h1>
                                <p>to do</p>
                            </div>
                        </div>
                        <div class="chip2x" onclick="boardPage()">
                            <div class="chipIcon2" ></div>
                            <div class="chipData2x">
                                <h1>${doneTasks}</h1>
                                <p>Done</p>
                            </div>

                        </div>
                    </div>
                    <div class="chipsAreaRow">
                        <div class="chip1x" onclick="boardPage()">
                            <img class="chipIcon" src=${"./IMG/urgent.png"} alt="Nix">
                            <div>
                                <h1>${urgendTasks}</h1>
                                <p>Urgent</p>
                            </div>
                            <img src="./IMG/Vector 5.png" alt="">
                            <div class="chipData1x">
                                <h2>${nextDeadline}</h2>
                                <p>Upcoming Deadline</p>
                            </div>
                        </div>
                    </div>
                    <div class="chipsAreaRow">
                        <div class="chip3x" onclick="boardPage()">
                            <div class="chipData3x">
                                <h2>${Join.tasks.length}</h2>
                                <p>Tasks in<br>Board</p>
                            </div>
                        </div>
                        <div class="chip3x">
                            <div class="chipData3x" onclick="boardPage()">
                                <h2>${progressCount}</h2>
                                <p>Tasks in<br>Progress</p>
                            </div>
                        </div>
                        <div class="chip3x">
                            <div class="chipData3x" onclick="boardPage()">
                                <h2>${feedbackCount}</h2>
                                <p>Awaiting<br>Feedback</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div> </div>
                    </div>
                    <div></div>
                </div>
                <div class="greetingArea"><h3>${daytime}</h3><h4 id="greetedUser">${greetedUser}</h4></div>
            </div>
        </div>

            `
    }
    checkTasksDone() {
        let count = 0
        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];
            if (task.done) {
                count++
            }

        }
        return count;
    }
    async getEndpoint(){
        return await fetch()
    }
}