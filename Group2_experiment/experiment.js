
        
        const jsPsych = initJsPsych({
            //timeline: timeline,
            
            on_finish: function(data) {
            proliferate.submit({"trials": data.values()});
            window.location.href = 'finish.html';
            }
        });
        
        
        let timeline = [];
        const general_instruction = {
            // Which plugin to use
            type: jsPsychHtmlButtonResponse,
            // What should be displayed on the screen
            stimulus: '<p><font size="3">We invite you to participate in a research study on language comprehension.</font></p>',
            // What should the button(s) say
            choices: ['Continue']
        };
        // push to the timeline
        timeline.push(general_instruction)      

        const instructions1 = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: "In this part, you will hear a name. If you think it is a name of a black person, press 'D'. If you think it is a name of a white person, press 'K'. Try to respond as quickly and accurately as you can.<br>When you're ready to begin, press the space bar.",
            choices: [" "]
        };
        //timeline.push(instructions1);

        let tv_array1 = create_tv_array(block1_objects);
        const block1 = {
            timeline: [
                {
                    type: jsPsychAudioKeyboardResponse,
                    choices: ['d', 'k'],
                    stimulus: jsPsych.timelineVariable('stimulus'),
                    response_allowed_while_playing: true,
                    //trial_duration: 4000,
                    prompt: `<div class=\"option_container\"><div class=\"option\">BLACK<br><br><b>D</b></div><div class=\"option\">WHITE<br><br><b>K</b></div></div>`,
                    data: jsPsych.timelineVariable('data')
                },
                {
                    type: jsPsychHtmlKeyboardResponse,
                    choices: [""],
                    stimulus: "",
                    response_ends_trial: false,
                    trial_duration: 1000
                }
            ],
            timeline_variables: tv_array1,
            randomize_order: true
        }
        //timeline.push(block1);

        const instructions2 = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: "In this part, you will hear a name. If you think it is a name of a hispanic person, press 'D'. If you think it is a name of a black person, press 'K'. Try to respond as quickly and accurately as you can.<br>When you're ready to begin, press the space bar.",
            choices: [" "]
        };
        //timeline.push(instructions2);

        let tv_array2 = create_tv_array(block2_objects);
        const block2 = {
            timeline: [
                {
                    type: jsPsychAudioKeyboardResponse,
                    choices: ['d', 'k'],
                    stimulus: jsPsych.timelineVariable('stimulus'),
                    response_allowed_while_playing: true,
                    //trial_duration: 4000,
                    prompt: `<div class=\"option_container\"><div class=\"option\">HISPANIC<br><br><b>D</b></div><div class=\"option\">BLACK<br><br><b>K</b></div></div>`,
                    data: jsPsych.timelineVariable('data')
                },
                {
                    type: jsPsychHtmlKeyboardResponse,
                    choices: [""],
                    stimulus: "",
                    response_ends_trial: false,
                    trial_duration: 1000
                }
            ],
            timeline_variables: tv_array2,
            randomize_order: true
        }
        //timeline.push(block2);

        const instructions3 = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: "In this part, you will hear a name. If you think it is a name of a white person, press 'D'. If you think it is a name of a hispanic person, press 'K'. Try to respond as quickly and accurately as you can.<br>When you're ready to begin, press the space bar.",
            choices: [" "]
        };
        //timeline.push(instructions3);

        let tv_array3 = create_tv_array(block3_objects);
        const block3 = {
            timeline: [
                {
                    type: jsPsychAudioKeyboardResponse,
                    choices: ['d', 'k'],
                    stimulus: jsPsych.timelineVariable('stimulus'),
                    response_allowed_while_playing: true,
                    //trial_duration: 4000,
                    prompt: `<div class=\"option_container\"><div class=\"option\">WHITE<br><br><b>D</b></div><div class=\"option\">HISPANIC<br><br><b>K</b></div></div>`,
                    data: jsPsych.timelineVariable('data')
                },
                {
                    type: jsPsychHtmlKeyboardResponse,
                    choices: [""],
                    stimulus: "",
                    response_ends_trial: false,
                    trial_duration: 1000
                }
            ],
            timeline_variables: tv_array3,
            randomize_order: true
        }
        //timeline.push(block3);

        var instructionBlockPairs = [
            [instructions1, block1],
            [instructions2, block2],
            [instructions3, block3]
          ];

        instructionBlockPairs = jsPsych.randomization.shuffle(instructionBlockPairs);

        //var timeline = [general_instruction];

        instructionBlockPairs.forEach(function(pair) {
            timeline.push(pair[0]); // Add the instruction trial
            timeline.push(pair[1]); // Add the corresponding block
        });
        


        jsPsych.run(timeline)