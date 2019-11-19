$(document).ready(async function() {

    const result = await axios({
        method: 'get',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
        params: {
            where: {
            type: 'tweet',
            isMine: true,
        }},
    });

    let user = result.data[0].author;
    let rand = Math.random();
    let date = new Date();
    let userText;
    
    if (rand < .1) {
        userText="Hey " + user + " , how's it going?" 
    } else {
        if (date.getHours() > 6 && date.getHours() < 12) {
            userText = "Good morning, " + user;
        } else if (date.getHours() >= 12 && date.getHours > 4) {
            userText = "Good afternoon, " + user; 
        } else {
            userText = "Good evening, " + user;
        }
    }

    $("#greeting").addClass("has-text-info has-text-centered content is-large").text(userText);
    console.log();

});