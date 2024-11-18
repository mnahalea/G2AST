const jsPsych = initJsPsych({
    on_finish: function() {
        const processedData = jsPsych.data.get().filter(trial => trial.rt !== null).values();
        localStorage.setItem("reactionData", JSON.stringify(processedData));
        window.location.href = 'testresults.html';
    }
});

// Define speakers and names
const speakers = [
    { name: "Speaker1", ethnicity: "White" },
    { name: "Speaker2", ethnicity: "White" },
    { name: "Speaker3", ethnicity: "Black" },
    { name: "Speaker4", ethnicity: "Black" },
    { name: "Speaker5", ethnicity: "Hispanic" },
    { name: "Speaker6", ethnicity: "Hispanic" }
];

const names = [
    "alanzo", "alejandro", "alexander", "anthony", "brett", "carlos", 
    "christopher", "connor", "darrius", "deandre", "demetrius",
    "fernando", "francisco", "hakeem", "jake", "juan",
    "kai", "malik", "miguel", "nathaniel", "raul", 
    "tanner", "von", "zachary"
];

const nameToNumber = {
    "alanzo": 1, "alejandro": 2, "alexander": 3, "anthony": 4, 
    "brett": 5, "carlos": 6, "christopher": 7, "connor": 8, 
    "darrius": 9, "deandre": 10, "demetrius": 11, 
    "fernando": 12, "francisco": 13, "hakeem": 14, "jake": 15, 
    "juan": 16, "kai": 17, "malik": 18, "miguel": 19, 
    "nathaniel": 20, "raul": 21, "tanner": 22, "von": 23, 
    "zachary": 24
};

// Create audio sources array with number assignments
const audioSources = [];
for (let i = 1; i <= 24; i++) {
    const name = Object.keys(nameToNumber).find(key => nameToNumber[key] === i);
    speakers.forEach(speaker => {
        audioSources.push({
            stimulus: `/Users/marcusnahalea/Desktop/AST4/Audio/${speaker.name}_${name}_${i}.wav`,
            name: name,
            number: i,
            speaker: speaker.name,
            ethnicity: speaker.ethnicity,
            data: {
                name: name,
                number: i,
                speaker: speaker.name,
                ethnicity: speaker.ethnicity,
                condition: 'ethnicity-test'
            }
        });
    });
}

// Modified balanced shuffle function to use number assignments
function balancedShuffle(array, ethnicity1, ethnicity2) {
    // Create arrays for each ethnicity
    const ethnicity1Trials = array.filter(a => a.ethnicity === ethnicity1);
    const ethnicity2Trials = array.filter(a => a.ethnicity === ethnicity2);
    
    // Get unique numbers 1-24
    const numbers = Array.from({length: 24}, (_, i) => i + 1);
    const shuffledNumbers = jsPsych.randomization.shuffle(numbers);
    
    // Select 12 trials for each ethnicity using unique numbers
    const selected1 = [];
    const selected2 = [];
    
    shuffledNumbers.forEach(num => {
        const availableTrials1 = ethnicity1Trials.filter(t => t.number === num);
        const availableTrials2 = ethnicity2Trials.filter(t => t.number === num);
        
        if (selected1.length < 12 && availableTrials1.length > 0) {
            selected1.push(availableTrials1[Math.floor(Math.random() * availableTrials1.length)]);
        } else if (selected2.length < 12 && availableTrials2.length > 0) {
            selected2.push(availableTrials2[Math.floor(Math.random() * availableTrials2.length)]);
        }
    });
    
    // Combine and shuffle the final selection
    return jsPsych.randomization.shuffle([...selected1, ...selected2]);
}

let timeline = [];

// General instruction
const general_instruction = {
    type: jsPsychHtmlButtonResponse,
    stimulus: '<p><font size="3">We invite you to participate in a research study on language comprehension.</font></p>',
    choices: ['Continue']
};
timeline.push(general_instruction);

// Create blocks with different ethnicity pairs
const createBlock = (ethnicity1, ethnicity2, key1, key2) => ({
    timeline: [
        {
            type: jsPsychAudioKeyboardResponse,
            stimulus: jsPsych.timelineVariable('stimulus'),
            choices: [key1, key2],
            prompt: `<div class="option_container">
                      <div class="option">${ethnicity1}<br><br><b>${key1.toUpperCase()}</b></div>
                      <div class="option">${ethnicity2}<br><br><b>${key2.toUpperCase()}</b></div>
                    </div>`,
            response_allowed_while_playing: true,
            data: jsPsych.timelineVariable('data'),
            on_finish: function(data) {
                const correctResponse = data.ethnicity === ethnicity1 ? key1 : key2;
                data.correct = data.response === correctResponse;
                data.congruency = "neutral";
            }
        },
        {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: "",
            choices: [""],
            trial_duration: 1000
        }
    ],
    timeline_variables: balancedShuffle(audioSources, ethnicity1, ethnicity2),
    randomize_order: false
});

// Create instruction blocks
const createInstruction = (ethnicity1, ethnicity2, key1, key2) => ({
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `In this part, you will hear different names. Press '${key1}' if you think it is a name of a ${ethnicity1.toLowerCase()} person, press '${key2}' if you think it is a name of a ${ethnicity2.toLowerCase()} person. Try to respond as quickly and accurately as you can.<br><br>Press the space bar to begin.`,
    choices: [" "]
});

// Create the three blocks with their instructions
const block1Instruction = createInstruction("White", "Black", 'd', 'k');
const block1 = createBlock("White", "Black", 'd', 'k');

const block2Instruction = createInstruction("Hispanic", "Black", 'd', 'k');
const block2 = createBlock("Hispanic", "Black", 'd', 'k');

const block3Instruction = createInstruction("White", "Hispanic", 'd', 'k');
const block3 = createBlock("White", "Hispanic", 'd', 'k');

// Create array of block pairs
const blockPairs = [
    [block1Instruction, block1],
    [block2Instruction, block2],
    [block3Instruction, block3]
];

// Randomize block order
const shuffledBlockPairs = jsPsych.randomization.shuffle(blockPairs);

// Add blocks to timeline
shuffledBlockPairs.forEach(pair => {
    timeline.push(pair[0]); // Add instruction
    timeline.push(pair[1]); // Add block
});

// Add final thank you screen
const thankYou = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "Thank you for participating! Your results will be shown on the next page.<br><br>Press any key to continue.",
    choices: "ALL_KEYS"
};
timeline.push(thankYou);

// Run the experiment
jsPsych.run(timeline);
